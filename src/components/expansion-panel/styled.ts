import styled, { css } from 'styled-components';

import { theme } from '@fellesdatakatalog/theme';

import Tag from '../tag';

const onMobileView = '@media (max-width: 900px)';

const ExpansionPanel = styled.div<{ isExpanded: boolean }>`
  background-color: white;
  border-radius: 5px;
  flex: 0 1 49%;
  margin-bottom: ${theme.spacing('S24')};

  ${({ isExpanded }) =>
    isExpanded &&
    css`
      box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
    `}

  ${onMobileView} {
    flex: 1;
  }
`;

const Title = styled.h2`
  display: inline-flex;
  font-size: 22px;
  font-weight: bold;
  color: ${({ theme: customTheme }) => customTheme.fdk.colors.text.link};
`;

const Subtitle = styled.h3`
  margin-top: 5px;
`;

const RequiredLabel = styled(Tag)`
  padding: 2px;
  margin-left: 5px;
`;

const Head = styled.div`
  display: flex;
  flex-direction: column;

  user-select: none;
  padding: 30px;

  cursor: pointer;

  & svg {
    fill: ${({ theme: customTheme }) => customTheme.fdk.colors.text.link};
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Description = styled.div`
  display: flex;
  align-items: center;
`;

const Body = styled.div`
  border-top: 1px solid
    ${({ theme: customTheme }) => customTheme.fdk.colors.neutrals.lighter};
  padding: 30px;

  & > form:nth-of-type(n + 2) {
    margin-top: 30px;
  }
`;

export default {
  ExpansionPanel,
  RequiredLabel,
  TitleWrapper,
  Description,
  Title,
  Subtitle,
  Head,
  Body
};
