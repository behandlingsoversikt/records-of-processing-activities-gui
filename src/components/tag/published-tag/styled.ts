import styled from 'styled-components';
import { Colour, theme } from '@fellesdatakatalog/theme';

import Tag from '..';

const PublishedTag = styled(Tag)`
  background-color: ${theme.colour(Colour.BLUE, 'B60')};
  color: ${theme.colour(Colour.NEUTRAL, 'N0')};

  & * {
    stroke: ${theme.colour(Colour.NEUTRAL, 'N0')};
  }
`;

export default { PublishedTag };
