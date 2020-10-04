import React, { memo, PropsWithChildren, ChangeEvent } from 'react';

import SC from './styled';

interface Props {
  id?: string;
  required?: boolean;
  isReadOnly?: boolean;
  placeholder?: string;
  labelText?: string;
  value?: string;
  error?: any;
  helperText?: any;
  name: string;
  onChange?: (event: ChangeEvent<any>) => void;
}

const TextAreaField = ({
  id,
  name,
  value,
  error,
  helperText,
  placeholder,
  labelText,
  isReadOnly,
  onChange
}: PropsWithChildren<Props>) => (
  <SC.Field error={error}>
    {labelText && <SC.Label htmlFor={name}>{labelText}</SC.Label>}
    {!isReadOnly ? (
      <SC.TextAreaField
        component='textarea'
        rows={3}
        id={id}
        placeholder={placeholder || labelText}
        name={name}
        value={value}
        onChange={onChange}
      />
    ) : (
      <SC.ReadOnlyLabel>{value}</SC.ReadOnlyLabel>
    )}
    {helperText && <SC.HelperText>{helperText}</SC.HelperText>}
  </SC.Field>
);

export default memo(TextAreaField);
