import React, { memo } from 'react';

import RecordStatusIndicator from '../record-status-indicator';

import SC from './styled';

import { RecordStatus } from '../../types/enums';

interface Props {
  title: string;
  subTitle: string;
  status?: RecordStatus;
}

const Headline = ({ title, subTitle, status }: Props): JSX.Element => (
  <SC.Headline>
    <SC.TitleWrapper>
      <SC.Title>{title}</SC.Title>
      {status && <RecordStatusIndicator status={status} />}
    </SC.TitleWrapper>
    <SC.SubTitle>{subTitle}</SC.SubTitle>
  </SC.Headline>
);

export default memo(Headline);
