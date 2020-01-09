import React, { memo } from 'react';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

import withRecords, { Props as RecordsProps } from '../with-records';

import SC from './styled';
import { SortOrder } from '../../types/enums';

interface Props extends RecordsProps {
  title: string;
  fieldSelector: string[];
}

const TableHead = ({
  title,
  fieldSelector,
  recordsActions: { sortRecords }
}: Props): JSX.Element => (
  <th>
    <div>
      <span>{title}</span>
      <SC.SortButtons>
        <button
          type='button'
          onClick={() => sortRecords(fieldSelector, SortOrder.ASC)}
        >
          <ArrowDropUp fontSize='large' />
        </button>
        <button
          type='button'
          onClick={() => sortRecords(fieldSelector, SortOrder.DSC)}
        >
          <ArrowDropDown fontSize='large' />
        </button>
      </SC.SortButtons>
    </div>
  </th>
);

export default memo(withRecords(TableHead));
