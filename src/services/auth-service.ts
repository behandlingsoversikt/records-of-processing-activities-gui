import { Auth } from '../lib/auth/auth';
import env from '../env';

const { OIDC_ISSUER } = env;
const OIDC_CLIENT_ID = 'records-of-processing-activities-gui';

export const authService = new Auth({
  oidcIssuer: OIDC_ISSUER,
  clientId: OIDC_CLIENT_ID,
  redirectUri: location.origin,
  logoutRedirectUri: location.origin,
  silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`
});

export default authService;
