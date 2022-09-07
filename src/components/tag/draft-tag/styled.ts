import styled from 'styled-components';
import { Colour, theme } from '@fellesdatakatalog/theme';

import Tag from '..';

const DraftTag = styled(Tag)`
  color: ${theme.colour(Colour.BLUE, 'B60')};
  background-color: ${theme.colour(Colour.BLUE, 'B15')};

  & * {
    stroke: ${theme.colour(Colour.BLUE, 'B60')};
  }
`;

export default { DraftTag };
