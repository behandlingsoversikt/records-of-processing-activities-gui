import styled from 'styled-components';
import { Colour, theme } from '@fellesdatakatalog/theme';

import Tag from '..';

const NonEditableTag = styled(Tag)`
  background-color: ${theme.colour(Colour.BLUE, 'B15')};
  color: ${theme.colour(Colour.BLUE, 'B60')};

  & * {
    stroke: ${theme.colour(Colour.BLUE, 'B60')};
  }
`;

export default { NonEditableTag };
