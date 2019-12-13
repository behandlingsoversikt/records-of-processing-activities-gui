import React, { useEffect, memo } from 'react';

import SC from './styled';
import Headline from '../headline';
import { RecordItem } from './record-item';
import { Record } from '../../types';
import { fetchAllRecordsRequested } from '../record-list-page/redux/actions';
import { localization } from '../../lib/localization';

interface Props {
  records: Record[];
  fetchAllRecords: typeof fetchAllRecordsRequested;
}

export const RecordReportPagePure = memo(
  ({ records, fetchAllRecords }: Props): JSX.Element => {
    useEffect(() => {
      fetchAllRecords();
    }, []);

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
