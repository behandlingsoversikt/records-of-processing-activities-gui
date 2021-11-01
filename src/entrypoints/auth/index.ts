import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { UserManager } from 'oidc-client';

import config from '../../services/auth/config';

async function run(): Promise<void> {
  const manager: UserManager = new UserManager({
    response_mode: 'query',
    ...config
  });

  let path = '/';

  const isInIframe = location !== parent.location;

  try {
    const user = await (isInIframe
      ? manager.signinSilentCallback()
      : manager.signinRedirectCallback());

    if (!isInIframe && user?.state?.path) {
      path = user.state.path.replace(location.origin, '');
    }
  } catch (e: any) {
    // TODO: handle errors and log them to Sentry
  } finally {
    if (!isInIframe) {
      location.replace(path);
    }
  }
}

run();
