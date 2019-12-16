import React, { memo, PropsWithChildren } from 'react';

import SC from './styled';

interface Props {
  required?: boolean;
  title: string;
  subtitle: string;
}

const Fieldset = ({
  title,
  subtitle,
  children,
  ...props
}: PropsWithChildren<Props>) => (
  <SC.Fieldset {...props}>
    <SC.Legend>
      <SC.Title>{title}</SC.Title>
      <SC.Subtitle>{subtitle}</SC.Subtitle>
    </SC.Legend>
    {children}
  </SC.Fieldset>
);

export default memo(Fieldset);
