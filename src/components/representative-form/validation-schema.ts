import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .ensure(),
  address: Yup.string()
    .required('Address is required')
    .ensure(),
  email: Yup.string()
    .required('Email is required')
    .ensure(),
  phone: Yup.string()
    .required('Phone number is required')
    .ensure()
});
