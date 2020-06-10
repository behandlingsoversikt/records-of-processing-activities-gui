import { createGlobalStyle } from 'styled-components';

import { hot } from 'react-hot-loader/root';

import CommonStyles from '../common';

export default hot(createGlobalStyle`
  ${CommonStyles}
`);
