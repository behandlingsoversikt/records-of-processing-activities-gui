import { Configuration } from './types';

interface EnvironmentVariables {
  OIDC_ISSUER: string;
  RECORDS_OF_PROCESSING_ACTIVITIES_URL: string;
  ORGANIZATION_API: string;
}

const env = ((window as any).env || {
  OIDC_ISSUER: 'https://sso.ut1.fellesdatakatalog.brreg.no/auth/realms/fdk',
  RECORDS_OF_PROCESSING_ACTIVITIES_URL: 'http://localhost:7135',
  ORGANIZATION_API:
    'https://organization-catalogue.ut1.fellesdatakatalog.brreg.no'
}) as EnvironmentVariables;

export default { ...env } as Configuration;
