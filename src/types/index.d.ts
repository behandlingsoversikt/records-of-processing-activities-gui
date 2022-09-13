export interface Configuration {
  ADMIN_GUI_HOST: string;
  DATASET_CATALOG_API: string;
  FDK_REGISTRATION_BASE_URI: string;
  OIDC_ISSUER: string;
  OIDC_CLIENT_SECRET: string;
  ORGANIZATION_CATALOG_URI: string;
  RECORDS_OF_PROCESSING_ACTIVITIES_URL: string;
  SEARCH_HOST: string;
  USE_DEMO_LOGO: boolean;
}

export * from './domain';
export * from './common';
