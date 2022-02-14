import * as Yup from 'yup';

import { RecordStatus } from '../../types/enums';

export default Yup.object().shape({
  status: Yup.string().oneOf([RecordStatus.DRAFT, RecordStatus.APPROVED]),
  title: Yup.string().ensure().required('Feltet må fylles ut'),
  purpose: Yup.string().ensure().required('Feltet må fylles ut'),
  categories: Yup.array()
    .of(
      Yup.object().shape({
        personalDataCategories: Yup.array()
          .of(Yup.string().ensure())
          .min(1, 'Feltet må fylles ut')
          .required('Feltet må fylles ut'),
        dataSubjectCategories: Yup.string()
          .ensure()
          .required('Feltet må fylles ut')
      })
    )
    .min(1, 'Minst 1 kategoripar')
    .required('Feltet må fylles ut'),
  securityMeasures: Yup.string().ensure().required('Feltet må fylles ut'),
  plannedDeletion: Yup.string().ensure().required('Feltet må fylles ut'),
  recipientCategories: Yup.array()
    .of(Yup.string().ensure())
    .min(1, 'Feltet må fylles ut')
    .required('Feltet må fylles ut'),
  dataTransfers: Yup.object().shape({
    transferred: Yup.boolean().required('Feltet må fylles ut'),
    thirdCountryRecipients: Yup.string()
      .ensure()
      .when('transferred', {
        is: true,
        then: Yup.string().ensure().required('Feltet må fylles ut')
      }),
    guarantees: Yup.string()
      .ensure()
      .when('transferred', {
        is: true,
        then: Yup.string().ensure().required('Feltet må fylles ut')
      })
  }),
  commonDataControllerContact: Yup.object().shape({
    commonDataControllerChecked: Yup.boolean().required('Feltet må fylles ut'),
    companies: Yup.string().when('commonDataControllerChecked', {
      is: true,
      then: Yup.string().ensure().required('Feltet må fylles ut')
    })
  })
});
