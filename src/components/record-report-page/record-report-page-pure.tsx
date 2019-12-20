import React, { useEffect, memo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import SC from './styled';
import Headline from '../headline';
import { RecordItem } from './record-item';
import { Record } from '../../types';
import { fetchAllRecordsRequested } from '../record-list-page/redux/actions';
import { localization } from '../../lib/localization';

interface RouteParams {
  organizationId: string;
}

interface Props extends RouteComponentProps<RouteParams> {
  records: Record[];
  fetchAllRecords: typeof fetchAllRecordsRequested;
}

export const RecordReportPagePure = memo(
  ({
    match: {
      params: { organizationId }
    },
    records,
    fetchAllRecords
  }: Props): JSX.Element => {
    useEffect(() => {
      if (organizationId) {
        fetchAllRecords(organizationId);
      }
    }, [organizationId]);

    return (
      <SC.RecordReportPage>
        <Headline title={localization.protocol} subTitle='' />

        <SC.RecordReportList>
          {records.map(record => (
            <RecordItem key={record.id} record={record} />
          ))}
        </SC.RecordReportList>
      </SC.RecordReportPage>
    );
  }
);
