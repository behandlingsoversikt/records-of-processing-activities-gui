import styled from 'styled-components';

const Representatives = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
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
  Representatives,
  LegalNoticeEU,
  InlineFields
};
