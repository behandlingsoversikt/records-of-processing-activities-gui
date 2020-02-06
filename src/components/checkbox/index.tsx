import React, { memo, ChangeEvent } from 'react';
import { Field } from 'formik';

import SC from './styled';

interface Props {
  name: string;
  checked: boolean;
  labelText: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({
  name,
  checked,
  labelText,
  onChange,
  ...props
}: Props): JSX.Element => (
  <SC.Checkbox {...props}>
    <Field
      id={name}
      type='checkbox'
      name={name}
      checked={!!checked}
      onChange={onChange}
    />
    <label htmlFor={name}>{labelText}</label>
  </SC.Checkbox>
);

export default memo(Checkbox);
