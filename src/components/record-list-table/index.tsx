import React, { memo } from 'react';

import TableHead from '../table-head';
import SC from './styled';

import RecordRow from '../record-row';

import { Record } from '../../types';

interface Props {
  records: Record[];
}

const RecordListTable = ({ records }: Props): JSX.Element => (
  <SC.RecordListTable>
    <thead>
      <tr>
        <TableHead sortable title='Navn/tittel' />
        <TableHead sortable title='Daglig behandlingsansvarlig' />
        <TableHead sortable title='Status' />
      </tr>
    </thead>
    <tbody>
      {records.map(record => (
        <RecordRow key={record.id} record={record} />
      ))}
    </tbody>
  </SC.RecordListTable>
);

export default memo(RecordListTable);
