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
  options: Option[];
  onChange?: (event: ChangeEvent<any>) => void;
}

const Radio = ({ name, value, options, onChange }: Props): JSX.Element => (
  <SC.Radio>
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
        <label htmlFor={label}>{label}</label>
      </SC.Option>
    ))}
  </SC.Radio>
);

export default memo(Radio);
