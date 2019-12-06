import styled from 'styled-components';

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextField = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.fdk.colors.neutrals.lightblue};
  color: ${({ theme }) => theme.fdk.colors.text.default};

  &:not(:disabled):focus {
    box-shadow: 0 0 0 0.1rem rgba(38, 128, 179, 0.5);
  }
`;
const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

export default { Field, TextField, Label };
