import React from 'react';
import { hot } from 'react-hot-loader/root';
import { ThemeProvider } from 'styled-components';

import AuthProvider from '../../providers/auth';

import GlobalStyles from './styles';
import theme from './styles/theme';

import Router from '../router';

export default hot(function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ThemeProvider>
  );
});
