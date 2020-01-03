import styled from 'styled-components';

const Headline = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  font-size: 30px;
  font-weight: bolder;
  margin-bottom: 5px;

  & > div {
    margin-left: 8px;
  }
`;

const SubTitle = styled.h2``;

export default { Headline, Title, SubTitle };
