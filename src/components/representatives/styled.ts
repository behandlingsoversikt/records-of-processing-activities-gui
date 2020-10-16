import styled from 'styled-components';

const Representatives = styled.div`
  display: flex;
  align-items: flex-start;
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

export default {
  Representatives,
  InlineFields
};
