import { RecordStatus } from './enums';

export interface RecordInterface {
  id: string;
  title: string;
  dataProcessorContactDetails: ContactDetailsInterface;
  status: RecordStatus;
}

export interface ContactDetailsInterface {
  name: string;
  address?: string;
  phone?: string;
  email?: string;
}

export interface RepresentativesInterface {
  dataControllerRepresentative?: ContactDetailsInterface;
  dataControllerRepresentativeInEU?: ContactDetailsInterface;
  dataProtectionOfficer?: ContactDetailsInterface;
}
