import React, { memo } from 'react';

import SC from './styled';

interface Props {
  title: string;
  subTitle: string;
}

const Headline = ({ title, subTitle }: Props): JSX.Element => (
  <SC.Headline>
    <SC.Title>{title}</SC.Title>
    <SC.SubTitle>{subTitle}</SC.SubTitle>
  </SC.Headline>
);

export default memo(Headline);
