import React, { memo, PropsWithChildren, ChangeEvent } from 'react';

import SC from './styled';

interface Props {
  required?: boolean;
  placeholder?: string;
  labelText: string;
  value?: string;
  name: string;
  onChange?: (event: ChangeEvent<any>) => void;
}

const TextField = ({
  name,
  value,
  placeholder,
  labelText,
  onChange
}: PropsWithChildren<Props>) => (
  <SC.Field>
    <SC.Label htmlFor={name}>{labelText}</SC.Label>
    <SC.TextField
      placeholder={placeholder || labelText}
      name={name}
      value={value}
      onChange={onChange}
    />
  </SC.Field>
);

export default memo(TextField);
