import React, { ChangeEvent, memo, useEffect, useState } from 'react';
import { FormikProps, withFormik } from 'formik';

import TextField from '../field-text';
import Fieldset from '../fdk-fieldset';

import SC from './styled';

import validationSchema from './validation-schema';

import { ContactDetailsInterface } from '../../types';
import { RepresentativeType } from '../../types/enums';

interface Props extends FormikProps<ContactDetailsInterface> {
  title: string;
  subtitle: string;
  description?: any;
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
  description,
  organizationId,
  onChange,
  values,
  errors,
  touched,
  handleChange
}: Props): JSX.Element => {
  const isEURepresentative =
    type === RepresentativeType.DATA_CONTROLLER_REPRESENTATIVE_IN_EU;

  const isControllerRepresentative =
    type === RepresentativeType.DATA_CONTROLLER_REPRESENTATIVE;

  const isDataProtectionOfficer =
    type === RepresentativeType.DATA_PROTECTION_OFFICER;

  const [hasEURepresentative, setHasEURepresentative] = useState(
    isEURepresentative
      ? !!(values.name || values.address || values.email || values.phone)
      : false
  );

  const handleHasEURepresentativeChange = (e: ChangeEvent<HTMLInputElement>) =>
    setHasEURepresentative(e.target.value === 'true');

  useEffect(() => {
    if (onChange && organizationId) {
      if (isEURepresentative) {
        onChange(type, hasEURepresentative ? values : {}, organizationId);
      } else {
        onChange(type, values, organizationId);
      }
    }
  }, [values, hasEURepresentative]);

  const renderRepresentativeForm = () => (
    <Fieldset
      title={title}
      subtitle={subtitle}
      description={description}
      required={
        isEURepresentative ||
        isControllerRepresentative ||
        isDataProtectionOfficer
      }
    >
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
  );

  return (
    <SC.RepresentativeForm>
      {isEURepresentative && (
        <SC.Radio
          name='hasEURepresentative'
          value={hasEURepresentative}
          labelText='Er behandlingsansvarlig etablert utenfor EU/EØS?'
          options={[
            { label: 'Ja', value: true },
            { label: 'Nei', value: false }
          ]}
          onChange={handleHasEURepresentativeChange}
        />
      )}
      {isEURepresentative
        ? hasEURepresentative && renderRepresentativeForm()
        : renderRepresentativeForm()}
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
