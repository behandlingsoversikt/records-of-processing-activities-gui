import React, { memo } from 'react';

import TableHead from '../table-head';

import SC from './styled';

import RecordRow from '../record-row';

import { Record } from '../../types';
import { SortField } from '../../types/enums';

interface Props {
  records: Record[];
}

const RecordListTable = ({ records }: Props): JSX.Element => (
  <SC.RecordListTable>
    <thead>
      <tr>
        <TableHead sortField={SortField.TITLE} title='Navn/tittel' />
        <TableHead
          sortField={SortField.CONTACT}
          title='Daglig behandlingsansvarlig'
        />
        <TableHead sortField={SortField.STATUS} title='Status' />
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
