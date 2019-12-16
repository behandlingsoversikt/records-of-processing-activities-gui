import React, { memo } from 'react';

import { ArrowDropUp, ArrowDropDown } from '@material-ui/icons';

import SC from './styled';

interface Props {
  title: string;
  sortable?: boolean;
}

const TableHead = ({ title, sortable = false }: Props): JSX.Element => (
  <th>
    <div>
      <span>{title}</span>
      {sortable && (
        <SC.SortButtons>
          <button type='button'>
            <ArrowDropUp />
          </button>
          <button type='button'>
            <ArrowDropDown />
          </button>
        </SC.SortButtons>
      )}
    </div>
  </th>
);

export default memo(TableHead);
