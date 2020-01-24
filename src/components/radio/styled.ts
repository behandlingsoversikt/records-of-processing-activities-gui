import styled, { css } from 'styled-components';

const Radio = styled.div``;

const Options = styled.div`
  display: flex;
`;

const Option = styled.span`
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

export default { Radio, Options, Option, HelperText };
