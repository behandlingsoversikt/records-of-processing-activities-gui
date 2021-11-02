import { Configuration } from './types';

interface EnvironmentVariables {
  OIDC_ISSUER: string;
  CLIENT_SECRET: string;
  RECORDS_OF_PROCESSING_ACTIVITIES_URL: string;
  FDK_REGISTRATION_BASE_URI: string;
  ORGANIZATION_API: string;
  SEARCH_HOST: string;
  ADMIN_GUI_HOST: string;
}

const env = ((window as any).env || {
  OIDC_ISSUER:
    'https://sso.staging.fellesdatakatalog.digdir.no/auth/realms/fdk',
  CLIENT_SECRET: '',
  RECORDS_OF_PROCESSING_ACTIVITIES_URL:
    'https://registrering-protokoll.staging.fellesdatakatalog.digdir.no',
  FDK_REGISTRATION_BASE_URI:
    'https://registrering.staging.fellesdatakatalog.digdir.no',
  ORGANIZATION_API:
    'https://organization-catalogue.staging.fellesdatakatalog.digdir.no',
  SEARCH_HOST: 'https://staging.fellesdatakatalog.digdir.no',
  ADMIN_GUI_HOST: 'https://admin.staging.fellesdatakatalog.digdir.no'
}) as EnvironmentVariables;

export default { ...env } as Configuration;
