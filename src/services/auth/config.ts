import type { UserManagerSettings } from 'oidc-client';

import env from '../../env';

const { OIDC_ISSUER, CLIENT_SECRET } = env;

const userManagerSettings: UserManagerSettings = {
  authority: OIDC_ISSUER,
  client_id: 'records-of-processing-activities-gui',
  client_secret: CLIENT_SECRET,
  redirect_uri: `${location.origin}/auth`,
  post_logout_redirect_uri: location.href,
  response_type: 'code',
  scope: 'openid authorities profile email',
  revokeAccessTokenOnSignout: true
};

export default userManagerSettings;
