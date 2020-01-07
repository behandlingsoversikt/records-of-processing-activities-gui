import React, { memo, useEffect } from 'react';
import { withFormik, FormikProps } from 'formik';

import TextField from '../field-text';
import Fieldset from '../fdk-fieldset';

import SC from './styled';

import validationSchema from './validation-schema';

import { ContactDetailsInterface } from '../../types';
import { RepresentativeType } from '../../types/enums';

interface Props extends FormikProps<ContactDetailsInterface> {
  title: string;
  subtitle: string;
  type: RepresentativeType;
  representative: ContactDetailsInterface;
  organizationId: string;
  onChange?: (
    type: RepresentativeType,
    payload: ContactDetailsInterface,
    organizationId: string
  ) => void;
}

const RepresentativeForm = ({
  type,
  title,
  subtitle,
  organizationId,
  onChange,
  values,
  errors,
  touched,
  handleChange
}: Props): JSX.Element => {
  useEffect(() => {
    if (onChange && organizationId) {
      onChange(type, values, organizationId);
    }
  }, [values]);

  return (
    <SC.RepresentativeForm>
      <Fieldset title={title} subtitle={subtitle}>
        <TextField
          name='name'
          labelText='Navn'
          placeholder='Fornavn og etternavn'
          value={values.name}
          error={errors.name && touched.name}
          helperText={touched.name && errors.name}
          onChange={handleChange}
        />
        <TextField
          name='address'
          labelText='Postadresse'
          value={values.address}
          error={errors.address && touched.address}
          helperText={touched.address && errors.address}
          onChange={handleChange}
        />
        <SC.InlineFields>
          <TextField
            name='email'
            labelText='E-post'
            value={values.email}
            error={errors.email && touched.email}
            helperText={touched.email && errors.email}
            onChange={handleChange}
          />
          <TextField
            name='phone'
            labelText='Telefon'
            value={values.phone}
            error={errors.phone && touched.phone}
            helperText={touched.phone && errors.phone}
            onChange={handleChange}
          />
        </SC.InlineFields>
      </Fieldset>
    </SC.RepresentativeForm>
  );
};

export default memo(
  withFormik({
    mapPropsToValues: ({
      representative: { name = '', address = '', email = '', phone = '' }
    }: Props) => ({
      name,
      address,
      email,
      phone
    }),
    handleSubmit: () => {},
    validationSchema,
    displayName: 'RepresentativeForm'
  })(RepresentativeForm) as any
);
