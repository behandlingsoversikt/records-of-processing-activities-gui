import React, { memo, PropsWithChildren } from 'react';

import SC from './styled';

interface Props {
  required?: boolean;
  placeholder?: string;
  labelText: string;
  name: string;
}

const TextField = ({
  name,
  placeholder,
  labelText
}: PropsWithChildren<Props>) => (
  <SC.Field>
    <SC.Label htmlFor={name}>{labelText}</SC.Label>
    <SC.TextField placeholder={placeholder || labelText} name={name} />
  </SC.Field>
);

export default memo(TextField);
