import React, { memo, PropsWithChildren } from 'react';

import SC from './styled';

interface Props {
  required?: boolean;
  title: string;
  subtitle: string;
}

const Fieldset = ({
  required,
  title,
  subtitle,
  children,
  ...props
}: PropsWithChildren<Props>) => (
  <SC.Fieldset {...props}>
    <SC.Legend>
      <SC.Inline>
        <SC.Title>{title}</SC.Title>
        {required && <SC.RequiredLabel text='Obligatorisk' />}
      </SC.Inline>
      <SC.Subtitle>{subtitle}</SC.Subtitle>
    </SC.Legend>
    {children}
  </SC.Fieldset>
);

export default memo(Fieldset);
