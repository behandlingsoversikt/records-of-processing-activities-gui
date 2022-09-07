import React, { memo, PropsWithChildren, ChangeEvent } from 'react';

import SC from './styled';
import { localization } from '../../utils/language/localization';

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

const TextField = ({
  id,
  required,
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
    <SC.Label htmlFor={name}>
      {labelText ?? null}
      {required && <SC.Required>{localization.required}</SC.Required>}
      {!isReadOnly ? (
        <SC.TextField
          id={id}
          placeholder={placeholder || labelText}
          name={name}
          value={value}
          onChange={onChange}
        />
      ) : (
        <SC.ReadOnlyLabel>{value}</SC.ReadOnlyLabel>
      )}
    </SC.Label>
    {helperText && <SC.HelperText>{helperText}</SC.HelperText>}
  </SC.Field>
);

export default memo(TextField);
