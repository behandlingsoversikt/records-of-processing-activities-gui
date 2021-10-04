export interface Configuration {
  OIDC_ISSUER: string;
  RECORDS_OF_PROCESSING_ACTIVITIES_URL: string;
  NEW_RECORDS_OF_PROCESSING_ACTIVITIES_URL: string;
  FDK_REGISTRATION_BASE_URI: string;
  ORGANIZATION_API: string;
  SEARCH_HOST: string;
  ADMIN_GUI_HOST: string;
}

export * from './domain';
export * from './common';
