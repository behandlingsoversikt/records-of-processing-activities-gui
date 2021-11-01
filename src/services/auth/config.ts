import type { UserManagerSettings } from 'oidc-client';

import env from '../../env';

const { OIDC_ISSUER } = env;

const userManagerSettings: UserManagerSettings = {
  authority: OIDC_ISSUER,
  client_id: 'records-of-processing-activities-gui',
  redirect_uri: `${location.href}`,
  post_logout_redirect_uri: location.href,
  response_type: 'code',
  scope: 'openid authorities profile email',
  revokeAccessTokenOnSignout: true
};

export default userManagerSettings;
