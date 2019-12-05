import { createGlobalStyle } from 'styled-components';

import { hot } from 'react-hot-loader/root';

import CommonStyles from '../common';
import NormaliseStyles from './normalise';
import ResetStyles from './reset';

export default hot(createGlobalStyle`
  ${ResetStyles}
  ${NormaliseStyles}
  ${CommonStyles}
`);
