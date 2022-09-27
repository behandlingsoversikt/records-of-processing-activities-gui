import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string().ensure().required('Feltet må fylles ut'),
  address: Yup.string().ensure().required('Feltet må fylles ut'),
  email: Yup.string()
    .ensure()
    .required('Feltet må fylles ut')
    .email('E-post er ikke gyldig'),
  phone: Yup.string().ensure().required('Feltet må fylles ut')
});
