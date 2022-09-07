import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';
import Tag from '..';

const MandatoryTag = styled(Tag)`
  background-color: ${theme.colour(Colour.BLUE, 'B60')};
  color: ${theme.colour(Colour.NEUTRAL, 'N0')};
`;

export default { MandatoryTag };
