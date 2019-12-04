import React from 'react';
import { hot } from 'react-hot-loader/root';

import AuthProvider from '../../providers/auth';

import Router from '../router';

export default hot(function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
});
