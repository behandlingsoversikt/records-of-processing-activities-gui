import * as Yup from 'yup';
import { localization } from '../../utils/language/localization';

const {
  validation: { requiredError, phoneNumberError }
} = localization;

export default Yup.object().shape({
  name: Yup.string().ensure().required(requiredError),
  address: Yup.string().ensure().required(requiredError),
  email: Yup.string()
    .ensure()
    .required(requiredError)
    .email('E-post er ikke gyldig'),
  phone: Yup.string()
    .matches(/^\+?[0-9\s]+$/, phoneNumberError)
    .ensure()
    .required(requiredError)
});
