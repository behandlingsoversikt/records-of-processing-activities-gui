import styled from 'styled-components';
import SvgIcon from '@fellesdatakatalog/icons';
import { Colour, theme } from '@fellesdatakatalog/theme';

const Icon = styled(SvgIcon)`
  width: ${theme.spacing('S24')};
  height: ${theme.spacing('S24')};

  & * {
    stroke: ${theme.colour(Colour.NEUTRAL, 'N0')};
  }
`;

export default { Icon };
