import React, { memo, ChangeEvent } from 'react';
import { Field } from 'formik';

import SC from './styled';

interface Option {
  label: string;
  value: any;
}

interface Props {
  name: string;
  value: any;
  error?: any;
  helperText?: any;
  options: Option[];
  onChange?: (event: ChangeEvent<any>) => void;
}

const Radio = ({
  name,
  value,
  error,
  helperText,
  options,
  onChange
}: Props): JSX.Element => (
  <SC.Radio>
    <SC.Options>
      {options.map(({ label, value: optionValue }) => (
        <SC.Option key={`${name}-${optionValue}`}>
          <Field
            type='radio'
            name={name}
            value={optionValue}
            checked={`${optionValue}` === `${value}`}
            id={`${name}-${optionValue}`}
            onChange={onChange}
          />
          <label htmlFor={`${name}-${optionValue}`}>{label}</label>
        </SC.Option>
      ))}
    </SC.Options>
    {helperText && <SC.HelperText error={error}>{helperText}</SC.HelperText>}
  </SC.Radio>
);

export default memo(Radio);
