import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from '../../components/app';

function run(): void {
  render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('root')
  );
}

run();

if ((module as any).hot) {
  (module as any).hot.accept();
}
