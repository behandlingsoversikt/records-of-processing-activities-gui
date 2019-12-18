import styled from 'styled-components';

const Radio = styled.div`
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

export default { Radio, Option };
