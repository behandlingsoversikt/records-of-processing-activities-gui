import React, { memo, ChangeEvent } from 'react';
import { useFormik } from 'formik';

import TextField from '../field-text';
import Fieldset from '../fdk-fieldset';

import SC from './styled';

import validationSchema from './validation-schema';

import { ContactDetailsInterface } from '../../types';

// interface FormValues {
//   name: string;
//   address: string;
//   phone: string;
//   email: string;
// }

interface Props {
  title: string;
  subtitle: string;
  representative: ContactDetailsInterface;
  onChange?: () => void;
}

// const RepresentativeForm = ({
//   title,
//   subtitle,
//   values: { name, address, phone, email }
// }: Props): JSX.Element => (
//   <SC.RepresentativeForm>
//     <Fieldset title={title} subtitle={subtitle}>
//       <TextField
//         labelText='Navn'
//         name='name'
//         placeholder='Fornavn og etternavn'
//         value={name}
//       />
//       <TextField labelText='Postadresse' name='address' value={address} />
//       <SC.InlineFields>
//         <TextField labelText='E-post' name='email' value={email} />
//         <TextField labelText='Telefon' name='phone' value={phone} />
//       </SC.InlineFields>
//     </Fieldset>
//   </SC.RepresentativeForm>
// );

const RepresentativeForm = ({
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
    onSubmit: () => onChange && onChange(),
    validationSchema
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

// export default memo(
//   withFormik({
//     mapPropsToValues: ({
//       representative: { name, address, phone, email }
//     }: Props) => ({
//       name,
//       address,
//       email,
//       phone
//     }),
//     handleSubmit: () => {},
//     validationSchema
//   })(RepresentativeForm)
// );
