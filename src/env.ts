import { Configuration } from './types';

interface EnvironmentVariables {
  ADMIN_GUI_HOST: string;
  FDK_REGISTRATION_BASE_URI: string;
  DATASET_CATALOG_API: string;
  OIDC_ISSUER: string;
  OIDC_CLIENT_SECRET: string;
  ORGANIZATION_CATALOG_URI: string;
  RECORDS_OF_PROCESSING_ACTIVITIES_URL: string;
  SEARCH_HOST: string;
  CATALOG_ADMIN_BASE_URI: string;
  USE_DEMO_LOGO: boolean;
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
  ORGANIZATION_CATALOG_URI:
    'https://organization-catalog.staging.fellesdatakatalog.digdir.no',
  RECORDS_OF_PROCESSING_ACTIVITIES_URL:
    'https://registrering-protokoll.staging.fellesdatakatalog.digdir.no',

  SEARCH_HOST: 'https://staging.fellesdatakatalog.digdir.no',
  CATALOG_ADMIN_BASE_URI:
    'https://catalog-admin.staging.fellesdatakatalog.digdir.no',
  USE_DEMO_LOGO: false
}) as EnvironmentVariables;

export default { ...env } as Configuration;
