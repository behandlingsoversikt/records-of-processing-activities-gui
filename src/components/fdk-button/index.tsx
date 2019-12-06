import React, { memo } from 'react';

import SC from './styled';

interface Props {
  text: string;
  variant?: 'primary' | 'secondary';
}

const FDKButton = ({ text, variant }: Props): JSX.Element => (
  <SC.FDKButton variant={variant}>{text}</SC.FDKButton>
);

export default memo(FDKButton);
