import { Record } from '../../types';
import { RecordStatus } from '../../types/enums';

export const mapRecordToValues = (
  {
    id,
    status = RecordStatus.DRAFT,
    dataProcessorContactDetails = [{ name: '', phone: '', email: '' }],
    dataProcessingAgreements = [{ dataProcessorName: '', agreementUrl: '' }],
    categories = [{ personalDataCategories: [], dataSubjectCategories: '' }],
    commonDataControllerContact: {
      companies = '',
      distributionOfResponsibilities = '',
      contactPoints = [{ name: '', email: '', phone: '' }]
    } = {},
    title = '',
    purpose = '',
    articleSixBasis = [{ legality: '', referenceUrl: '' }],
    otherArticles: {
      articleNine: {
        checked: articleNineChecked = false,
        referenceUrl: articleNineReferenceUrl = ''
      } = {},
      articleTen: {
        checked: articleTenChecked = false,
        referenceUrl: articleTenReferenceUrl = ''
      } = {}
    } = {},
    businessAreas = [],
    relatedDatasets = [],

    securityMeasures = '',
    plannedDeletion = '',
    dataProtectionImpactAssessment: {
      conducted = undefined,
      assessmentReportUrl = ''
    } = {},
    personalDataSubjects = '',
    privacyProcessingSystems = '',
    recipientCategories = [],
    dataTransfers: {
      transferred = undefined,
      thirdCountryRecipients = '',
      guarantees = ''
    } = {}
  }: Partial<Record>,
  organizationId: string
): Omit<Record, 'updatedAt'> => ({
  id,
  status,
  dataProcessorContactDetails,
  organizationId,
  dataProcessingAgreements,
  categories,
  commonDataControllerContact: {
    companies,
    distributionOfResponsibilities,
    contactPoints
  },
  title,
  purpose,
  articleSixBasis,
  otherArticles: {
    articleNine: {
      checked: articleNineChecked,
      referenceUrl: articleNineReferenceUrl
    },
    articleTen: {
      checked: articleTenChecked,
      referenceUrl: articleTenReferenceUrl
    }
  },
  businessAreas,
  relatedDatasets,
  securityMeasures,
  plannedDeletion,
  dataProtectionImpactAssessment: {
    conducted,
    assessmentReportUrl
  },
  personalDataSubjects,
  privacyProcessingSystems,
  recipientCategories,
  dataTransfers: {
    transferred,
    thirdCountryRecipients,
    guarantees
  }
});
