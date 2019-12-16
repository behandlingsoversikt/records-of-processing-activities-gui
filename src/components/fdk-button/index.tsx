import React, { memo, HTMLProps } from 'react';

import SC from './styled';

interface Props extends HTMLProps<HTMLButtonElement> {
  text: string;
  variant?: 'primary' | 'secondary';
}

const FDKButton = ({ text, variant, onClick }: Props): JSX.Element => (
  <SC.FDKButton variant={variant} onClick={onClick}>
    {text}
  </SC.FDKButton>
);

export default memo(FDKButton);
