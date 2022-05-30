import { RepresentativesInterface } from '../../../types';

const isValidDataControllerRepresentativeInEU = ({
  dataControllerRepresentativeInEU
}: RepresentativesInterface) =>
  !!(
    (dataControllerRepresentativeInEU.name &&
      dataControllerRepresentativeInEU.address &&
      dataControllerRepresentativeInEU.email &&
      dataControllerRepresentativeInEU.phone) ||
    (!dataControllerRepresentativeInEU.name &&
      !dataControllerRepresentativeInEU.address &&
      !dataControllerRepresentativeInEU.email &&
      !dataControllerRepresentativeInEU.phone)
  );

const isValidDataProtectionOfficer = ({
  dataProtectionOfficer
}: RepresentativesInterface) =>
  !!(
    dataProtectionOfficer.name &&
    dataProtectionOfficer.address &&
    dataProtectionOfficer.email &&
    dataProtectionOfficer.phone
  );

export const isValidRepresentatives = (
  representatives: RepresentativesInterface
) =>
  isValidDataControllerRepresentativeInEU(representatives) &&
  isValidDataProtectionOfficer(representatives);
