import React, { memo } from 'react';

import SC from './styled';

import Record from '../record';
import { RecordStatus } from '../../types/enums';
import { RecordInterface } from '../../types';

const records: RecordInterface[] = [
  {
    id: '2512',
    title: 'Ferie og Fravar',
    dataProcessorContactDetails: {
      name: 'Kari Norman',
      email: 'a@b.com',
      phone: '22113355'
    },
    status: RecordStatus.APPROVED
  },
  {
    id: '2513',
    title: 'ANother OnE',
    dataProcessorContactDetails: {
      name: 'Paal Norman',
      email: 'a@cb.com',
      phone: '22513355'
    },
    status: RecordStatus.APPROVED
  },
  {
    id: '21513',
    title: 'ANother OnE',
    dataProcessorContactDetails: {
      name: 'Paal Norman',
      email: 'a@cb.com',
      phone: '22513355'
    },
    status: RecordStatus.DRAFT
  }
];

const RecordListTable = () => (
  <SC.RecordListTable>
    <thead>
      <tr>
        <th>Navn/tittel</th>
        <th>Daglig behandlingsanvsar</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {records.map(record => (
        <Record key={record.id} record={record} />
      ))}
    </tbody>
  </SC.RecordListTable>
);

export default memo(RecordListTable);
