import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  InMemoryWebStorage,
  User,
  UserManager,
  WebStorageStateStore
} from 'oidc-client';

async function run(): Promise<void> {
  const manager: UserManager = new UserManager({
    response_mode: 'query',
    userStore: new WebStorageStateStore({ store: new InMemoryWebStorage() })
  });
  let path: string = '/';
  const isInIframe: boolean = location !== parent.location;
  try {
    const user: User = await (isInIframe
      ? manager.signinSilentCallback()
      : manager.signinRedirectCallback());
    if (user && user.state && user.state.path) {
      path = user.state.path.replace(location.origin, '');
    }
  } catch (e) {
    console.error(e);
  } finally {
    if (!isInIframe) {
      location.replace(path);
    }
  }
}

run();
