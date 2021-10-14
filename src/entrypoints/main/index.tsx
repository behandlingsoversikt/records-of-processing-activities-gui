import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import { render } from 'react-dom';

import App from '../../components/app';

function run(): void {
  render(<App />, document.getElementById('root'));
}

run();

if ((module as any).hot) {
  (module as any).hot.accept();
}
