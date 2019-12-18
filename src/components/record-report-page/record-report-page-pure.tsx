import React, { useEffect, memo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import SC from './styled';
import Headline from '../headline';
import { RecordItem } from './record-item';
import { Record, RepresentativesInterface } from '../../types';
import { fetchAllRecordsRequested } from '../record-list-page/redux/actions';
import { localization } from '../../lib/localization';
import { fetchAllRepresentativesRequested } from '../representatives/redux/actions';
import { ReportRepresentatives } from './report-representatives';

interface RouteParams {
  organizationId: string;
}

interface Props extends RouteComponentProps<RouteParams> {
  records: Record[];
  fetchAllRecords: typeof fetchAllRecordsRequested;
  representatives: RepresentativesInterface;
  fetchAllRepresentatives: typeof fetchAllRepresentativesRequested;
}

export const RecordReportPagePure = memo(
  ({
    match: {
      params: { organizationId }
    },
    records,
    fetchAllRecords,
    fetchAllRepresentatives,
    representatives
  }: Props): JSX.Element => {
    useEffect(() => {
      if (organizationId) {
        fetchAllRecords(organizationId);
        fetchAllRepresentatives(organizationId);
      }
    }, [organizationId]);

    return (
      <SC.RecordReportPage>
        <Headline title={localization.protocol} subTitle='' />

        <ReportRepresentatives representatives={representatives} />

        <SC.RecordReportList>
          {records.map(record => (
            <RecordItem key={record.id} record={record} />
          ))}
        </SC.RecordReportList>
      </SC.RecordReportPage>
    );
  }
);
