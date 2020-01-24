import React, { memo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router-dom';

import env from '../../env';

import withOrganization, {
  Props as OrganizationProps
} from '../with-organization';

import Headline from '../headline';
import BreadcrumbsBar from '../breadcrumbs-bar';
import RecordForm from '../record-form';
import StatusBar from '../status-bar';

import SC from './styled';

import * as actions from './redux/actions';

import { RecordStatus } from '../../types/enums';

const { FDK_REGISTRATION_BASE_URI } = env;

interface RouteParams {
  organizationId: string;
  recordId?: string;
}

interface Props extends OrganizationProps, RouteComponentProps<RouteParams> {
  record?: any;
  actions: typeof actions;
}

const RecordPage = ({
  record,
  organization,
  history: { replace },
  match: {
    params: { organizationId, recordId }
  },
  actions: {
    getRecordRequested,
    patchRecordRequested,
    deleteRecordRequested,
    resetRecord
  },
  organizationActions: { fetchOrganizationRequested }
}: Props): JSX.Element => {
  const [recordTitle, setRecordTitle] = useState('');
  const [canChangeUrl, setCanChangeUrl] = useState(false);
  const [formIsValid, setFormValidity] = useState(false);

  const navigateToRecordListPage = () => replace(`/${organizationId}`);
  const id = record?.get('id');

  useEffect(() => {
    if (organizationId) {
      fetchOrganizationRequested(organizationId);
    }
  }, [organizationId]);

  useEffect(() => {
    resetRecord();
    setCanChangeUrl(true);
    if (recordId) {
      getRecordRequested(recordId, organizationId, navigateToRecordListPage);
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!recordId && id && canChangeUrl) {
      replace(`/${organizationId}/records/${id}`);
    }
  }, [record]);

  const handleRecordStatusChange = (status: RecordStatus) =>
    patchRecordRequested({ id, organizationId, status });

  return (
    <SC.RecordPage>
      <BreadcrumbsBar
        breadcrumbs={[
          {
            title: 'Alle kataloger',
            url: FDK_REGISTRATION_BASE_URI
          },
          { title: 'Protokoller', url: `${location.origin}/${organizationId}` },
          {
            title: recordTitle ?? 'Protokoll over behandlingsaktiviteter',
            current: true
          }
        ]}
      />
      <Headline
        title={recordTitle}
        subTitle={organization?.name ?? ''}
        status={record?.get('status') ?? RecordStatus.DRAFT}
      />
      <RecordForm
        organizationId={organizationId}
        record={record}
        onChange={patchRecordRequested}
        onTitleChange={setRecordTitle}
        onValidityChange={setFormValidity}
      />
      <StatusBar
        recordId={recordId}
        updatedAt={record?.get('updatedAt')}
        status={record?.get('status') ?? RecordStatus.DRAFT}
        canBeApproved={formIsValid}
        onSetStatus={handleRecordStatusChange}
        onRecordRemove={() => {
          deleteRecordRequested(id, organizationId, navigateToRecordListPage);
        }}
      />
    </SC.RecordPage>
  );
};

const mapStateToProps = (state: any) => ({
  record: state.RecordPageReducer.get('record')
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(withOrganization(RecordPage)));
