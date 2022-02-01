import styled from 'styled-components';
import { theme } from '@fellesdatakatalog/theme';

const Checkbox = styled.div`
  display: flex;
  align-items: center;
  user-select: none;

  &,
  & * {
    cursor: pointer;
  }

  & > input {
    height: ${theme.spacing('S16')};
    width: ${theme.spacing('S16')};
  }

  & > label {
    margin-left: ${theme.spacing('S8')};
  }
`;

export default { Checkbox };
