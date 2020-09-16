import { RecordStatus, DatasetStatus } from './enums';

export interface Record {
  id?: string;
  status: RecordStatus;
  organizationId: string;
  purpose: string;
  categories: Categories[];
  recipientCategories: string[];
  personalDataSubjects: string;
  plannedDeletion: string;
  highPrivacyRisk?: boolean;
  articleSixBasis: ArticleSixBasis[];
  otherArticles: Partial<OtherArticles>;
  businessAreas: string[];
  securityMeasures: string;
  privacyProcessingSystems: string;
  dataProcessorContactDetails: Omit<ContactDetailsInterface, 'address'>[];
  dataProcessingAgreements: DataProcessingAgreement[];
  commonDataControllerContact: Partial<CommonDataControllerContact>;
  dataTransfers: Partial<DataTransfers>;
  title: string;
  relatedDatasets: string[];
  dataProtectionImpactAssessment: Partial<DataProtectionImpactAssessment>;
  updatedAt: string;
}

export interface Categories {
  personalDataCategories?: string[];
  dataSubjectCategories?: string;
}

export interface ContactDetailsInterface {
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
}

export interface DataProcessingAgreement {
  dataProcessorName: string;
  agreementUrl: string;
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
  articleNine: Partial<Article>;
  articleTen: Partial<Article>;
}

export interface CommonDataControllerContact {
  companies: string;
  distributionOfResponsibilities: string;
  contactPoints: Omit<ContactDetailsInterface, 'address'>[];
}

export interface DataTransfers {
  transferred: boolean;
  thirdCountryRecipients: string;
  guarantees: string;
}

export interface DataProtectionImpactAssessment {
  conducted: boolean;
  assessmentReportUrl: string;
}

export interface Organization {
  uri: string;
  id: string;
  name: string;
  orgPath: string;
}

interface TranslatableField {
  [key: string]: string;
}

export interface Dataset {
  id: string;
  title: TranslatableField;
  registrationStatus: DatasetStatus;
}
