import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';
import Tag from '..';

const RecommendedTag = styled(Tag)`
  background-color: ${theme.colour(Colour.BLUE, 'B30')};
  color: ${theme.colour(Colour.BLUE, 'B60')};
`;

export default { RecommendedTag };
