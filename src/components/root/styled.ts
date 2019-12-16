import styled from 'styled-components';

import Common from '../common/styled';

const Root = styled(Common.Container)`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  height: calc(100% - 74px);
  margin: 0 auto;
  margin-top: 74px;
`;

export default { Root };
