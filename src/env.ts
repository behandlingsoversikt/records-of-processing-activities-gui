import { Configuration } from './types';

interface EnvironmentVariables {
  OIDC_ISSUER: string;
}

const env = ((window as any).env || {
  OIDC_ISSUER: 'http://localhost:8084/auth/realms/fdk'
}) as EnvironmentVariables;

export default { ...env } as Configuration;
