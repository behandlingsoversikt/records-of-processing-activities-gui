import { Configuration } from './types';

interface EnvironmentVariables {
  OIDC_ISSUER: string;
  RECORDS_OF_PROCESSING_ACTIVITIES_URL: string;
  FDK_REGISTRATION_BASE_URI: string;
  ORGANIZATION_API: string;
}

const env = ((window as any).env || {
  OIDC_ISSUER: 'https://sso.it1.fellesdatakatalog.brreg.no/auth/realms/fdk',
  RECORDS_OF_PROCESSING_ACTIVITIES_URL: 'http://localhost:7135',
  FDK_REGISTRATION_BASE_URI:
    'https://registrering.it1.fellesdatakatalog.brreg.no',
  ORGANIZATION_API:
    'https://organization-catalogue.it1.fellesdatakatalog.brreg.no'
}) as EnvironmentVariables;

export default { ...env } as Configuration;
