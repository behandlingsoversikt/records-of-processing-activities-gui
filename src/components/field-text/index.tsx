import React, { memo, PropsWithChildren, ChangeEvent } from 'react';

import SC from './styled';

interface Props {
  id?: string;
  required?: boolean;
  placeholder?: string;
  labelText?: string;
  value?: string;
  error?: any;
  helperText?: any;
  name: string;
  onChange?: (event: ChangeEvent<any>) => void;
}

const TextField = ({
  id,
  name,
  value,
  error,
  helperText,
  placeholder,
  labelText,
  onChange
}: PropsWithChildren<Props>) => (
  <SC.Field error={error}>
    {labelText && <SC.Label htmlFor={name}>{labelText}</SC.Label>}
    <SC.TextField
      id={id}
      placeholder={placeholder || labelText}
      name={name}
      value={value}
      onChange={onChange}
    />
    {helperText && <SC.HelperText>{helperText}</SC.HelperText>}
  </SC.Field>
);

export default memo(TextField);
