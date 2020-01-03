import React, { memo } from 'react';

import CreateIconOutlined from '@material-ui/icons/CreateOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';

import SC from './styled';

import { RecordStatus } from '../../types/enums';

interface Props {
  status: RecordStatus;
}

const statuses = {
  [RecordStatus.DRAFT]: {
    text: 'Utkast',
    icon: CreateIconOutlined
  },
  [RecordStatus.APPROVED]: {
    text: 'Godkjent',
    icon: CheckBoxOutlinedIcon
  }
};

const RecordStatusIndicator = ({ status }: Props): JSX.Element => {
  const { text, icon: Icon } = statuses[status];
  return (
    <SC.RecordStatusIndicator>
      <Icon />
      <span>{text}</span>
    </SC.RecordStatusIndicator>
  );
};

export default memo(RecordStatusIndicator);
