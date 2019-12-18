import styled from 'styled-components';

const Checkbox = styled.div`
  display: flex;
  align-items: center;
  user-select: none;

  &,
  & * {
    cursor: pointer;
  }

  & > label {
    margin-left: 5px;
  }
`;

export default { Checkbox };
