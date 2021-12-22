import styled from 'styled-components';

import { theme } from '@fellesdatakatalog/theme';

import Common from '../common/styled';

const onMobileView = '@media (max-width: 900px)';

const RecordListPage = styled(Common.Container)`
  margin-bottom: 50px;
`;

const RecordListActions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  margin-top: 50px;
  margin-bottom: 15px;

  & > button:nth-of-type(n + 2) {
    margin-left: 10px;

    ${onMobileView} {
      margin-left: 0;
      margin-top: ${theme.spacing('S10')};
    }
  }
`;

export default {
  RecordListPage,
  RecordListActions
};
