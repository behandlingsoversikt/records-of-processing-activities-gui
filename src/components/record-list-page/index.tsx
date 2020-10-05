import React, { useEffect, memo, FC } from 'react';
import { compose } from 'redux';
import { RouteComponentProps } from 'react-router-dom';

import Footer from '@fellesdatakatalog/internal-footer';

import Root from '../root';
import Header from '../header';

import env from '../../env';
import { authService } from '../../services/auth-service';

import withOrganization, {
  Props as OrganizationProps
} from '../with-organization';

import withRecords, { Props as RecordsProps } from '../with-records';

import Headline from '../headline';
import FDKButton from '../fdk-button';
import FDKDropdownButton from '../fdk-dropdown-button';
import BreadcrumbsBar from '../breadcrumbs-bar';
import Representatives from '../representatives';
import RecordListTable from '../record-list-table';

import SC from './styled';

import { Record } from '../../types';

const { FDK_REGISTRATION_BASE_URI } = env;

interface RouteParams {
  organizationId: string;
}

interface Props
  extends RecordsProps,
    OrganizationProps,
    RouteComponentProps<RouteParams> {
  records: Record[];
}

const RecordListPage = ({
  records,
  organization,
  history: { push },
  match: {
    params: { organizationId }
  },
  recordsActions: { fetchAllRecordsRequested },
  organizationActions: { fetchOrganizationRequested }
}: Props): JSX.Element => {
  useEffect(() => {
    if (organizationId) {
      fetchOrganizationRequested(organizationId);
      fetchAllRecordsRequested(organizationId);
    }
  }, [organizationId]);

  const navigateToNewRecordPage = () => push(`/${organizationId}/records`);

  const isReadOnlyUser = authService.isReadOnlyUser(organizationId);

  return (
    <>
      <Root>
        <Header />
        <SC.RecordListPage>
          <BreadcrumbsBar
            breadcrumbs={[
              {
                title: 'Alle kataloger',
                url: FDK_REGISTRATION_BASE_URI
              },
              { title: 'Behandlingsoversikt', current: true }
            ]}
          />
          <Headline
            title='Behandlingsoversikt'
            subTitle={organization?.name ?? ''}
          />
          <Representatives
            isReadOnlyUser={isReadOnlyUser}
            organizationId={organizationId}
          />
          <SC.RecordListActions>
            {!isReadOnlyUser && (
              <FDKButton
                variant='primary'
                text='Legg til behandlingsaktivitet'
                onClick={navigateToNewRecordPage}
              />
            )}
            <FDKDropdownButton
              variant='secondary'
              text='Generer rapport'
              subButtons={[
                {
                  name: 'Alle behandlingsaktivteter',
                  href: `/${organizationId}/report`,
                  external: true
                },
                {
                  name: 'Obligatoriske felt',
                  href: `/${organizationId}/report/required`,
                  external: true
                }
              ]}
            />
          </SC.RecordListActions>
          <RecordListTable records={records} />
        </SC.RecordListPage>
      </Root>
      <Footer />
    </>
  );
};

export default compose<FC>(memo, withRecords, withOrganization)(RecordListPage);
