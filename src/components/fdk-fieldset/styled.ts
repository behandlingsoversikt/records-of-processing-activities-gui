import styled from 'styled-components';

const Fieldset = styled.fieldset`
  display: flex;
  & > div {
    margin-top: 20px;
  }
`;

const Legend = styled.legend`
  padding: 15px;
  background: ${({ theme }) => theme.fdk.colors.neutrals.skyblue};
  display: flex;
  width: 100%;
  flex-direction: column;
  border-radius: 5px;
`;

const Title = styled.b`
  font-size: 18px;
`;
const Subtitle = styled.small`
  margin-top: 5px;
  font-size: 15px;
  font-weight: 300;
`;

export default { Fieldset, Legend, Title, Subtitle };
