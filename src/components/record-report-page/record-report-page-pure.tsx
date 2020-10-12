import React, { useEffect, memo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import IconAlertWarning from '../../images/icon-alert-warning-md.svg';

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
import { RecordStatus } from '../../types/enums';

interface RouteParams {
  required?: 'required';
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
    params: { organizationId, required }
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

  const requiredFieldsOnly = !!required;

  return (
    <SC.Root>
      <SC.RecordReportPage>
        <SC.Logo />
        <SC.TitleWrapper>
          <SC.RecordReportTitle>
            {requiredFieldsOnly ? localization.protocol : localization.overview}
            <div>{`for ${organization?.name ?? ''}`}</div>
          </SC.RecordReportTitle>
          {requiredFieldsOnly && (
            <SC.RecordReportSubTitle>
              <IconAlertWarning />
              Inneholder kun obligatoriske felter
            </SC.RecordReportSubTitle>
          )}
        </SC.TitleWrapper>

        <ReportRepresentatives representatives={representatives} />

        <SC.RecordReportList>
          {(requiredFieldsOnly
            ? records.filter(({ status }) => status === RecordStatus.APPROVED)
            : records
          ).map(record => (
            <RecordItem
              key={record.id}
              record={record}
              requiredFieldsOnly={requiredFieldsOnly}
            />
          ))}
        </SC.RecordReportList>
      </SC.RecordReportPage>
    </SC.Root>
  );
};

export default memo(withRecords(withOrganization(RecordReportPage)));
