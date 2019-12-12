import React, { memo, ChangeEvent } from 'react';
import { useFormik } from 'formik';

import TextField from '../field-text';
import Fieldset from '../fdk-fieldset';

import SC from './styled';

// import validationSchema from './validation-schema';

import { ContactDetailsInterface } from '../../types';
import { RepresentativeType } from '../../types/enums';

interface Props {
  title: string;
  subtitle: string;
  type: RepresentativeType;
  representative: ContactDetailsInterface;
  onChange?: (
    type: RepresentativeType,
    payload: ContactDetailsInterface
  ) => void;
}

const RepresentativeForm = ({
  type,
  title,
  subtitle,
  representative: { name, address, email, phone },
  onChange
}: Props): JSX.Element => {
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name,
      address,
      email,
      phone
    },
    onSubmit: (): void => onChange && onChange(type, values)
    // validationSchema
  });

  const onValueChange = (e: ChangeEvent<any>) => {
    handleChange(e);
    handleSubmit(e);
  };

  return (
    <SC.RepresentativeForm>
      <Fieldset title={title} subtitle={subtitle}>
        <TextField
          labelText='Navn'
          name='name'
          placeholder='Fornavn og etternavn'
          value={values.name}
          onChange={onValueChange}
        />
        <TextField
          labelText='Postadresse'
          name='address'
          value={values.address}
          onChange={onValueChange}
        />
        <SC.InlineFields>
          <TextField
            labelText='E-post'
            name='email'
            value={values.email}
            onChange={onValueChange}
          />
          <TextField
            labelText='Telefon'
            name='phone'
            value={values.phone}
            onChange={onValueChange}
          />
        </SC.InlineFields>
      </Fieldset>
    </SC.RepresentativeForm>
  );
};

export default memo(RepresentativeForm);
