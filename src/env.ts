import { Configuration } from './types';

interface EnvironmentVariables {
  ADMIN_GUI_HOST: string;
  FDK_REGISTRATION_BASE_URI: string;
  DATASET_CATALOG_API: string;
  OIDC_ISSUER: string;
  OIDC_CLIENT_SECRET: string;
  ORGANIZATION_API: string;
  RECORDS_OF_PROCESSING_ACTIVITIES_URL: string;
  SEARCH_HOST: string;
}

const env = ((window as any).env || {
  ADMIN_GUI_HOST: 'https://admin.staging.fellesdatakatalog.digdir.no',
  FDK_REGISTRATION_BASE_URI:
    'https://registrering.staging.fellesdatakatalog.digdir.no',
  DATASET_CATALOG_API:
    'https://registrering.staging.fellesdatakatalog.digdir.no',
  OIDC_ISSUER:
    'https://sso.staging.fellesdatakatalog.digdir.no/auth/realms/fdk',
  OIDC_CLIENT_SECRET: '',
  ORGANIZATION_API:
    'https://organization-catalogue.staging.fellesdatakatalog.digdir.no',
  RECORDS_OF_PROCESSING_ACTIVITIES_URL:
    'https://registrering-protokoll.staging.fellesdatakatalog.digdir.no',

  SEARCH_HOST: 'https://staging.fellesdatakatalog.digdir.no'
}) as EnvironmentVariables;

export default { ...env } as Configuration;
