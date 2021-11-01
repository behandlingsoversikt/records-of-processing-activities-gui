import React, { memo, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Footer from '@fellesdatakatalog/internal-footer';

import Root from '../root';
import Header from '../header';

import env from '../../env';
import AuthService from '../../services/auth';

import withOrganization, {
  Props as OrganizationProps
} from '../with-organization';
import withRecord, { Props as RecordProps } from '../with-record';

import Headline from '../headline';
import BreadcrumbsBar from '../breadcrumbs-bar';
import RecordForm from '../record-form';
import StatusBar from '../status-bar';

import SC from './styled';

import { RecordStatus } from '../../types/enums';

const { FDK_REGISTRATION_BASE_URI } = env;

interface RouteParams {
  organizationId: string;
  recordId?: string;
}

interface Props
  extends OrganizationProps,
    RecordProps,
    RouteComponentProps<RouteParams> {}

const RecordPage = ({
  record,
  organization,
  history: { replace },
  match: {
    params: { organizationId, recordId }
  },
  recordActions: {
    getRecordRequested: getRecord,
    deleteRecordRequested: deleteRecord,
    createRecordRequested: createRecord,
    resetRecord
  },
  organizationActions: { fetchOrganizationRequested }
}: Props): JSX.Element => {
  const [recordTitle, setRecordTitle] = useState('');
  const [recordStatus, setRecordStatus] = useState(
    record?.status ?? RecordStatus.DRAFT
  );
  const [canChangeUrl, setCanChangeUrl] = useState(false);
  const [formIsValid, setFormValidity] = useState(false);

  const navigateToRecordListPage = () => replace(`/${organizationId}`);
  const id = record?.id;

  const isReadOnlyUser = AuthService.isReadOnlyUser(organizationId);

  useEffect(() => {
    if (organizationId) {
      fetchOrganizationRequested(organizationId);
    }
  }, [organizationId]);

  useEffect(() => {
    resetRecord();
    setCanChangeUrl(true);
    if (recordId) {
      getRecord(recordId, organizationId, navigateToRecordListPage);
    } else {
      createRecord({ organizationId });
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!recordId && id && canChangeUrl) {
      replace(`/${organizationId}/records/${id}`);
    }
    if (record?.status && record.status !== recordStatus) {
      setRecordStatus(record.status);
    }
  }, [record]);

  const handleRecordStatusChange = (status: RecordStatus) => {
    if (formIsValid || status === RecordStatus.DRAFT) {
      setRecordStatus(status);
    }
  };

  return (
    <>
      <Root>
        <Header />
        <SC.RecordPage>
          <BreadcrumbsBar
            breadcrumbs={[
              {
                title: 'Alle kataloger',
                url: FDK_REGISTRATION_BASE_URI
              },
              {
                title: 'Behandlingsoversikt',
                url: `${location.origin}/${organizationId}`
              },
              {
                title: recordTitle ?? 'Behandlingsoversikt',
                current: true
              }
            ]}
          />
          <Headline
            title={recordTitle}
            subTitle={organization?.name ?? ''}
            status={recordStatus}
          />
          <RecordForm
            organizationId={organizationId}
            recordStatus={recordStatus}
            onTitleChange={setRecordTitle}
            onStatusChange={setRecordStatus}
            onValidityChange={setFormValidity}
            isReadOnlyUser={isReadOnlyUser}
          />
          {!isReadOnlyUser && (
            <StatusBar
              recordId={recordId}
              canBeApproved={formIsValid}
              updatedAt={record?.updatedAt}
              status={recordStatus}
              onSetStatus={handleRecordStatusChange}
              onRecordRemove={() =>
                id && deleteRecord(id, organizationId, navigateToRecordListPage)
              }
            />
          )}
        </SC.RecordPage>
      </Root>
      <Footer />
    </>
  );
};

export default memo(withOrganization(withRecord(RecordPage)));
