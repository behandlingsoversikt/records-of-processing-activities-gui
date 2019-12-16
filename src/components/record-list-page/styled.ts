import styled from 'styled-components';

import Common from '../common/styled';

const RecordListPage = styled(Common.Container)`
  margin-bottom: 50px;
`;

const RecordListActions = styled.div`
  margin-top: 50px;
  margin-bottom: 15px;

  & > button:nth-of-type(n + 2) {
    margin-left: 10px;
  }
`;

export default {
  RecordListPage,
  RecordListActions
};
