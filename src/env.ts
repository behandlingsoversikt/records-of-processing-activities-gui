import { Configuration } from './types';

interface EnvironmentVariables {
  OIDC_ISSUER: string;
  RECORDS_OF_PROCESSING_ACTIVITIES_URL: string;
  FDK_REGISTRATION_BASE_URI: string;
  ORGANIZATION_API: string;
}

const env = ((window as any).env || {
  OIDC_ISSUER:
    'https://sso.staging.fellesdatakatalog.digdir.no/auth/realms/fdk',
  RECORDS_OF_PROCESSING_ACTIVITIES_URL: 'http://localhost:7135',
  FDK_REGISTRATION_BASE_URI:
    'https://registrering.staging.fellesdatakatalog.digdir.no',
  ORGANIZATION_API:
    'https://organization-catalogue.staging.fellesdatakatalog.digdir.no'
}) as EnvironmentVariables;

export default { ...env } as Configuration;
