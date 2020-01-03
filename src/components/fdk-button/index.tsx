import React, { memo, ButtonHTMLAttributes, ComponentType } from 'react';

import SC from './styled';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: 'primary' | 'secondary' | 'default';
  icon?: ComponentType;
}

const FDKButton = ({
  text,
  variant,
  icon: Icon,
  onClick,
  ...rest
}: Props): JSX.Element => (
  <SC.FDKButton variant={variant} onClick={onClick} {...rest}>
    {Icon && <Icon />}
    {text}
  </SC.FDKButton>
);

export default memo(FDKButton);
