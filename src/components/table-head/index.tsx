import React, { memo } from 'react';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

import withRecords, { Props as RecordsProps } from '../with-records';

import SC from './styled';
import { SortOrder, SortField } from '../../types/enums';

interface Props extends RecordsProps {
  title: string;
  sortField: SortField;
}

const TableHead = ({
  title,
  sortField,
  recordsActions: { sortRecords }
}: Props): JSX.Element => (
  <th>
    <div>
      <span>{title}</span>
      <SC.SortButtons>
        <button
          title='Sorter stigende'
          type='button'
          onClick={() => sortRecords(sortField, SortOrder.ASC)}
        >
          <ArrowDropUp fontSize='large' />
        </button>
        <button
          title='Sorter synkende'
          type='button'
          onClick={() => sortRecords(sortField, SortOrder.DSC)}
        >
          <ArrowDropDown fontSize='large' />
        </button>
      </SC.SortButtons>
    </div>
  </th>
);

export default memo(withRecords(TableHead));
