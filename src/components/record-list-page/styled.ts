import styled from 'styled-components';

import Common from '../common/styled';

const RecordListPage = styled(Common.Container)``;

const Representatives = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const RecordListActions = styled.div`
  margin-bottom: 15px;

  & > button:nth-of-type(n + 2) {
    margin-left: 10px;
  }
`;

const InlineFields = styled.div`
  display: flex;
  & > div:nth-of-type(n + 2) {
    margin-left: 20px;
  }

  & > div:first-of-type {
    flex: 0 0 60%;
  }
`;

const LegalNoticeEU = styled.div`
  line-height: 24px;
  margin-top: 60px;
  margin-bottom: 30px;
  text-align: justify;
`;

export default {
  RecordListPage,
  RecordListActions,
  Representatives,
  LegalNoticeEU,
  InlineFields
};
