import styled from 'styled-components';

import Tag from '../tag';

const Fieldset = styled.fieldset`
  display: flex;
  min-width: 0;

  & > div {
    margin-top: 20px;
  }
`;

const Legend = styled.legend`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 15px;
  background: ${({ theme }) => theme.fdk.colors.neutrals.skyblue};
  border-radius: 5px;
`;

const Inline = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.b`
  font-size: 18px;
`;

const RequiredLabel = styled(Tag)`
  margin-left: 5px;
`;

const Subtitle = styled.small`
  margin-top: 5px;
  font-size: 15px;
  font-weight: 300;
`;

export default { Fieldset, Legend, Inline, Title, RequiredLabel, Subtitle };
