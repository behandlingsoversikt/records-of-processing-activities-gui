import styled, { css } from 'styled-components';

const Radio = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 10px;
`;

const Options = styled.div`
  display: flex;
`;

const Option = styled.span<{ isReadOnly?: boolean; checked?: boolean }>`
  &,
  & * {
    cursor: pointer;
  }

  &:nth-of-type(n + 2) {
    margin-left: 20px;
  }

  & > label {
    margin-left: 5px;
  }

  ${({ isReadOnly, checked, theme }) =>
    isReadOnly &&
    css`
      margin: 0;
      padding: 4px 12px;
      border: 1px solid ${theme.fdk.colors.neutrals.darker};
      border-radius: 4px;
      background: ${checked ? theme.fdk.colors.neutrals.darker : 'none'};
      color: ${checked ? 'white' : theme.fdk.colors.neutrals.darker};
    `}
`;

const HelperText = styled.p<{ error?: boolean }>`
  margin-top: 5px;
  margin-left: 8px;
  font-size: 1.2rem;

  ${({ error }) =>
    error &&
    css`
      color: red;
    `}
`;

export default { Radio, Label, Options, Option, HelperText };
