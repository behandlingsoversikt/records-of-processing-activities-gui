import * as Yup from 'yup';

import { RecordStatus } from '../../types/enums';

export default Yup.object().shape({
  status: Yup.string().oneOf([RecordStatus.DRAFT, RecordStatus.APPROVED]),
  title: Yup.string()
    .ensure()
    .required('Feltet må fylles ut'),
  purpose: Yup.string()
    .ensure()
    .required('Feltet må fylles ut'),
  dataSubjectCategories: Yup.array()
    .of(Yup.string().ensure())
    .min(1, 'Feltet må fylles ut')
    .required('Feltet må fylles ut'),
  personalDataCategories: Yup.array()
    .of(Yup.string().ensure())
    .min(1, 'Feltet må fylles ut')
    .required('Feltet må fylles ut'),
  securityMeasures: Yup.string()
    .ensure()
    .required('Feltet må fylles ut'),
  plannedDeletion: Yup.string()
    .ensure()
    .required('Feltet må fylles ut'),
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
        then: Yup.string()
          .ensure()
          .required('Feltet må fylles ut')
      }),
    guarantees: Yup.string()
      .ensure()
      .when('transferred', {
        is: true,
        then: Yup.string()
          .ensure()
          .required('Feltet må fylles ut')
      })
  })
});
