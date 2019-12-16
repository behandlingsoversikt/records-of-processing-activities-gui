import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string()
    .ensure()
    .required('Name is required'),
  address: Yup.string()
    .ensure()
    .required('Address is required'),
  email: Yup.string()
    .ensure()
    .required('Email is required')
    .email('Enter a valid email address'),
  phone: Yup.string()
    .ensure()
    .required('Phone number is required')
});
