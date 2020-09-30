import React, { useEffect, memo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import withOrganization, {
  Props as OrganizationProps
} from '../with-organization';

import withRecords, { Props as RecordsProps } from '../with-records';

import SC from './styled';
import { RecordItem } from './record-item';
import { RepresentativesInterface } from '../../types';
import { localization } from '../../lib/localization';
import { fetchAllRepresentativesRequested } from '../representatives/redux/actions';
import { ReportRepresentatives } from './report-representatives';

interface RouteParams {
  organizationId: string;
}

interface Props
  extends RecordsProps,
    OrganizationProps,
    RouteComponentProps<RouteParams> {
  representatives: RepresentativesInterface;
  fetchAllRepresentatives: typeof fetchAllRepresentativesRequested;
}

const RecordReportPage = ({
  records,
  organization,
  representatives,
  match: {
    params: { organizationId }
  },
  fetchAllRepresentatives,
  organizationActions: { fetchOrganizationRequested },
  recordsActions: { fetchAllRecordsRequested }
}: Props): JSX.Element => {
  useEffect(() => {
    if (organizationId) {
      fetchAllRecordsRequested(organizationId);
      fetchAllRepresentatives(organizationId);
      fetchOrganizationRequested(organizationId);
    }
  }, [organizationId]);

  return (
    <SC.Root>
      <SC.RecordReportPage>
        <SC.Logo />

        <SC.RecordReportTitle>
          {localization.protocol}
          <div>{`for ${organization?.name ?? ''}`}</div>
        </SC.RecordReportTitle>

        <ReportRepresentatives representatives={representatives} />

        <SC.RecordReportList>
          {records.map(record => (
            <RecordItem key={record.id} record={record} />
          ))}
        </SC.RecordReportList>
      </SC.RecordReportPage>
    </SC.Root>
  );
};

export default memo(withRecords(withOrganization(RecordReportPage)));
