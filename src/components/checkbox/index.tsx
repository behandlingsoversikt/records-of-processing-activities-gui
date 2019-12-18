import React, { memo, ChangeEvent } from 'react';
import { Field } from 'formik';

import SC from './styled';

interface Props {
  name: string;
  value: any;
  labelText: string;
  onChange?: (event: ChangeEvent<any>) => void;
}

const Checkbox = ({ name, value, labelText, onChange }: Props): JSX.Element => (
  <SC.Checkbox>
    <Field
      id={name}
      type='checkbox'
      name={name}
      value={value}
      checked={`${value}` === 'true'}
      onChange={onChange}
    />
    <label htmlFor={name}>{labelText}</label>
  </SC.Checkbox>
);

export default memo(Checkbox);
