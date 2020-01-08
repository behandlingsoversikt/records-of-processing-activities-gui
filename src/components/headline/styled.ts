import styled from 'styled-components';

const Headline = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: bolder;
  margin-right: 10px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SubTitle = styled.h2``;

export default { Headline, TitleWrapper, Title, SubTitle };
