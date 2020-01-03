import styled from 'styled-components';

import Common from '../common/styled';

const RecordPage = styled(Common.Container)`
  margin-bottom: 50px;

  & + footer {
    margin-bottom: 64px;
  }
`;

export default { RecordPage };
