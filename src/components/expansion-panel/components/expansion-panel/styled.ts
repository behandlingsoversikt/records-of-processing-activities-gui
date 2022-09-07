import styled, { css } from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';

const ExpansionPanel = styled.div`
  background: ${theme.colour(Colour.NEUTRAL, 'N0')};
  box-shadow: 0px ${theme.spacing('S4')} ${theme.spacing('S6')}
    rgba(45, 55, 65, 0.25);
  border-radius: ${theme.spacing('S4')};
`;

const HeadContent = styled.div`
  flex-grow: 1;
`;

const HeadExpansionIndicator = styled.div`
  display: flex;
  align-items: center;
`;

const Head = styled.div<{ shouldExpandOnHeadClick?: boolean }>`
  display: flex;
  justify-content: space-between;
  user-select: none;

  ${({ shouldExpandOnHeadClick }) =>
    shouldExpandOnHeadClick
      ? css`
          cursor: pointer;
        `
      : css`
          & > ${HeadExpansionIndicator} {
            cursor: pointer;
          }
        `}
`;

const CollapseIcon = styled.div`
  height: 16px;
  width: 16px;
  background: red;
`;

const ExpandIcon = styled.div`
  height: 16px;
  width: 16px;
  background: blue;
`;

const Body = styled.div``;

export default {
  ExpansionPanel,
  HeadContent,
  HeadExpansionIndicator,
  Head,
  CollapseIcon,
  ExpandIcon,
  Body
};
