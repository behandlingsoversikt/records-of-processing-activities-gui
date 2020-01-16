import React, { useEffect, memo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import env from '../../env';

import withOrganization, {
  Props as OrganizationProps
} from '../with-organization';

import withRecords, { Props as RecordsProps } from '../with-records';

import Headline from '../headline';
import FDKButton from '../fdk-button';
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

  const navigateToReportPage = () => push(`/${organizationId}/report`);
  const navigateToNewRecordPage = () => push(`/${organizationId}/records`);

  return (
    <SC.RecordListPage>
      <BreadcrumbsBar
        breadcrumbs={[
          {
            title: 'Alle kataloger',
            url: FDK_REGISTRATION_BASE_URI
          },
          { title: 'Protokoller', current: true }
        ]}
      />
      <Headline
        title='Protokoll over behandlingsaktiviteter'
        subTitle={organization?.name ?? ''}
      />
      <Representatives organizationId={organizationId} />
      <SC.RecordListActions>
        <FDKButton
          variant='primary'
          text='Legg til behandlingsaktivitet'
          onClick={navigateToNewRecordPage}
        />
        <FDKButton
          variant='secondary'
          text='Generer rapport'
          onClick={navigateToReportPage}
        />
      </SC.RecordListActions>
      <RecordListTable records={records} />
    </SC.RecordListPage>
  );
};

export default memo(withRecords(withOrganization(RecordListPage)));
