import React, { FC, PropsWithChildren, memo, useState, useEffect } from 'react';
import { compose } from 'redux';

import service from '../../services/auth';

import Context from './context';

const AuthProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const [isInitialised, setIsInitialised] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const init = async () => {
    setIsInitialised(true);

    const authenticated = await service.init();
    setIsAuthenticated(authenticated);
  };

  useEffect(() => {
    if (!isInitialised) {
      init();
    }
  }, []);

  return isInitialised && isAuthenticated ? (
    <Context.Provider value={{ service }}>{children}</Context.Provider>
  ) : null;
};

export default compose<FC>(memo)(AuthProvider);
export { withAuth } from './hoc';
export type { ServiceProps as Props } from './hoc';
