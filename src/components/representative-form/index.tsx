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
  isReadOnlyUser?: boolean;
  onChange?: (
    type: RepresentativeType,
    payload: ContactDetailsInterface,
    organizationId: string
  ) => void;
}

const labels = {
  [RepresentativeType.DATA_CONTROLLER_REPRESENTATIVE]: {
    name: 'Navn på behandlingsansvarliges representant',
    address: 'Virksomhetens postadresse',
    email: 'Virksomhetens e-post',
    phone: 'Virksomhetens telefon'
  },
  [RepresentativeType.DATA_CONTROLLER_REPRESENTATIVE_IN_EU]: {
    name: 'Navn på behandlingsansvarliges representant i EU',
    address: 'Postadresse',
    email: 'E-post',
    phone: 'Telefon'
  },
  [RepresentativeType.DATA_PROTECTION_OFFICER]: {
    name: 'Navn på personvernombud',
    address: 'Postadresse',
    email: 'E-post',
    phone: 'Telefon'
  }
};

const RepresentativeForm = ({
  type,
  title,
  subtitle,
  description,
  organizationId,
  isReadOnlyUser,
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

  return (
    <SC.RepresentativeForm>
      {isEURepresentative && (
        <Fieldset
          title='Er behandlingsansvarlig etablert utenfor EU/EØS?'
          subtitle='Virksomheter som er etablert utenfor EU eller EØS,
          men som har geografisk virkeområde innenfor EU eller EØS må
          utpeke en representant innenfor EU eller EØS. Se Personopplysningsloven
          for mer informasjon.'
          isReadOnly={isReadOnlyUser}
          required
        >
          <SC.Radio
            isReadOnly={isReadOnlyUser}
            name='hasEURepresentative'
            value={hasEURepresentative}
            labelText=''
            options={[
              { label: 'Ja', value: true },
              { label: 'Nei', value: false }
            ]}
            onChange={handleHasEURepresentativeChange}
          />
        </Fieldset>
      )}
      {(!isEURepresentative || hasEURepresentative) && (
        <Fieldset
          title={title}
          subtitle={subtitle}
          description={description}
          required={
            isEURepresentative ||
            isControllerRepresentative ||
            isDataProtectionOfficer
          }
          isReadOnly={isReadOnlyUser}
        >
          <TextField
            isReadOnly={isReadOnlyUser}
            name='name'
            labelText={labels[type].name}
            placeholder='Fornavn og etternavn'
            value={values.name}
            error={errors.name && touched.name}
            helperText={touched.name && errors.name}
            onChange={handleChange}
          />
          <TextField
            isReadOnly={isReadOnlyUser}
            name='address'
            labelText={labels[type].address}
            value={values.address}
            error={errors.address && touched.address}
            helperText={touched.address && errors.address}
            onChange={handleChange}
          />
          <SC.InlineFields>
            <TextField
              isReadOnly={isReadOnlyUser}
              name='email'
              labelText={labels[type].email}
              value={values.email}
              error={errors.email && touched.email}
              helperText={touched.email && errors.email}
              onChange={handleChange}
            />
            <TextField
              isReadOnly={isReadOnlyUser}
              name='phone'
              labelText={labels[type].phone}
              value={values.phone}
              error={errors.phone && touched.phone}
              helperText={touched.phone && errors.phone}
              onChange={handleChange}
            />
          </SC.InlineFields>
        </Fieldset>
      )}
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
