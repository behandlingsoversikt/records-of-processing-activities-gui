import * as Yup from 'yup';

import { RecordStatus } from '../../types/enums';
import { localization } from '../../utils/language/localization';

const {
  validation: { requiredError }
} = localization;

export default Yup.object().shape({
  status: Yup.string().oneOf([RecordStatus.DRAFT, RecordStatus.APPROVED]),
  title: Yup.string().ensure().required(requiredError),
  purpose: Yup.string().ensure().required(requiredError),
  categories: Yup.array()
    .of(
      Yup.object().shape({
        personalDataCategories: Yup.array()
          .of(Yup.string().ensure())
          .min(1, requiredError)
          .required(requiredError),
        dataSubjectCategories: Yup.string().ensure().required(requiredError)
      })
    )
    .min(1, 'Minst 1 kategoripar')
    .required(requiredError),
  securityMeasures: Yup.string().ensure().required(requiredError),
  plannedDeletion: Yup.string().ensure().required(requiredError),
  recipientCategories: Yup.array()
    .of(Yup.string().ensure())
    .min(1, requiredError)
    .required(requiredError),
  dataTransfers: Yup.object().shape({
    transferred: Yup.boolean()
      .required(requiredError)
      .oneOf([true, false], requiredError)
      .nullable(),
    thirdCountryRecipients: Yup.string()
      .ensure()
      .when('transferred', {
        is: true,
        then: Yup.string().ensure().required(requiredError)
      }),
    guarantees: Yup.string()
      .ensure()
      .when('transferred', {
        is: true,
        then: Yup.string().ensure().required(requiredError)
      })
  }),
  commonDataControllerContact: Yup.object().shape({
    commonDataControllerChecked: Yup.boolean()
      .required(requiredError)
      .oneOf([true, false], requiredError)
      .nullable(),
    companies: Yup.string().when('commonDataControllerChecked', {
      is: true,
      then: Yup.string().ensure().required(requiredError)
    }),
    contactPoints: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required(requiredError)
        })
      )
      .nullable()
  })
});
