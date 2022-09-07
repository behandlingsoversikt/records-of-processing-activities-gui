import { theme } from '@fellesdatakatalog/theme';
import styled from 'styled-components';

const Tag = styled.span`
  height: ${theme.spacing('S24')};
  padding: ${theme.spacing('S8')};
  border-radius: ${theme.spacing('S48')};
  display: flex;
  align-items: center;
  gap: ${theme.spacing('S4')};
  width: fit-content;

  svg {
    width: ${theme.spacing('S12')};
    height: ${theme.spacing('S12')};
  }
`;

const TagText = styled.span`
  height: ${theme.spacing('S16')};
  font-style: normal;
  font-weight: ${theme.fontWeight('FW400')};
  font-size: ${theme.fontSize('FS16')};
  line-height: ${theme.spacing('S16')};
`;

export default { Tag, TagText };
