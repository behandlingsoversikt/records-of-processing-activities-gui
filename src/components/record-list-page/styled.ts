import styled from 'styled-components';

import Common from '../common/styled';

const RecordListPage = styled(Common.Container)``;

const Representatives = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RecordListActions = styled.div`
  margin-bottom: 15px;

  & > button:nth-of-type(n + 2) {
    margin-left: 10px;
  }
`;

export default { RecordListPage, RecordListActions, Representatives };
