import { RecordStatus } from './enums';

export interface Record {
  id: string;
  status: RecordStatus;
  organizationId: string;
  purpose: string;
  dataSubjectCategories: string[];
  personalDataCategories: string[];
  recipientCategories: string;
  personalDataSubjects: string;
  plannedDeletion: string;
  highPrivacyRisk: boolean;
  articleSixBasis: ArticleSixBasis[];
  otherArticles: OtherArticles[];
  businessArea: string[];
  securityMeasures: string;
  privacyProcessingSystems: string;
  dataProcessorContactDetails: Omit<ContactDetailsInterface, 'address'>;
  commonDataControllerContact: Partial<CommonDataControllerContact>;
  dataTransfers: DataTransfers;
  title: string;
  relatedDatasets: string[];
  dataProtectionImpactAssessment: DataProtectionImpactAssessment;
  dataProcessingAgreements: DataProcessingAgreement[];
}

export interface ContactDetailsInterface {
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
}

export interface RepresentativesInterface {
  dataControllerRepresentative: ContactDetailsInterface;
  dataControllerRepresentativeInEU: ContactDetailsInterface;
  dataProtectionOfficer: ContactDetailsInterface;
}

export interface ArticleSixBasis {
  legality: string;
  referenceUrl: string;
}

export interface Article {
  checked: boolean;
  referenceUrl: string;
}

export interface OtherArticles {
  articleNine: Article;
  articleTen: Article;
}

export interface CommonDataControllerContact {
  companies: string;
  distributionOfResponsibilities: string;
  contactPoints: Omit<ContactDetailsInterface, 'address'>[];
}

export interface DataTransfers {
  transfered: boolean;
  thirdCountryRecipients: string;
  guarantees: string;
  internationalOrganizations: string;
}

export interface DataProtectionImpactAssessment {
  conducted: boolean;
  assessmentReportUrl: string;
}

export interface DataProcessingAgreement {
  dataProcessorName: string;
  agreementUrl: string;
}
