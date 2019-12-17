import React, { memo } from 'react';

import SC from './styled';

interface Props {
  text: string;
}

const Tag = ({ text, ...props }: Props): JSX.Element => (
  <SC.Tag {...props}>{text}</SC.Tag>
);

export default memo(Tag);
