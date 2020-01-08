import React, { useEffect, memo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import env from '../../env';

import withOrganization, {
  Props as OrganizationProps
} from '../with-organization';

import SC from './styled';
import Headline from '../headline';
import BreadcrumbsBar from '../breadcrumbs-bar';
import { RecordItem } from './record-item';
import { Record, RepresentativesInterface } from '../../types';
import { fetchAllRecordsRequested } from '../record-list-page/redux/actions';
import { localization } from '../../lib/localization';
import { fetchAllRepresentativesRequested } from '../representatives/redux/actions';
import { ReportRepresentatives } from './report-representatives';

interface RouteParams {
  organizationId: string;
}

interface Props extends OrganizationProps, RouteComponentProps<RouteParams> {
  records: Record[];
  fetchAllRecords: typeof fetchAllRecordsRequested;
  representatives: RepresentativesInterface;
  fetchAllRepresentatives: typeof fetchAllRepresentativesRequested;
}

const { FDK_REGISTRATION_BASE_URI } = env;

const RecordReportPage = ({
  records,
  organization,
  representatives,
  match: {
    params: { organizationId }
  },
  fetchAllRecords,
  fetchAllRepresentatives,
  organizationActions: { fetchOrganizationRequested }
}: Props): JSX.Element => {
  useEffect(() => {
    if (organizationId) {
      fetchAllRecords(organizationId);
      fetchAllRepresentatives(organizationId);
      fetchOrganizationRequested(organizationId);
    }
  }, [organizationId]);

  return (
    <SC.RecordReportPage>
      <BreadcrumbsBar
        breadcrumbs={[
          {
            title: 'Alle kataloger',
            url: FDK_REGISTRATION_BASE_URI
          },
          {
            title: 'Protokoller',
            url: `${location.origin}/${organizationId}`
          },
          {
            title: 'Rapport',
            current: true
          }
        ]}
      />
      <Headline
        title={localization.protocol}
        subTitle={organization?.name ?? ''}
      />

      <ReportRepresentatives representatives={representatives} />

      <SC.RecordReportList>
        {records.map(record => (
          <RecordItem key={record.id} record={record} />
        ))}
      </SC.RecordReportList>
    </SC.RecordReportPage>
  );
};

export default memo(withOrganization(RecordReportPage));
