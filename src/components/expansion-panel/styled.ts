import styled, { css } from 'styled-components';

const ExpansionPanel = styled.div<{ isExpanded: boolean }>`
  flex: 0 0 calc(50% - 15px);

  background-color: white;
  border-radius: 5px;

  ${({ isExpanded }) =>
    isExpanded &&
    css`
      box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
    `}
`;

const Title = styled.h2`
  display: inline-flex;
  font-size: 22px;
  font-weight: bold;
  color: ${({ theme }) => theme.fdk.colors.text.link};
`;

const Subtitle = styled.h3`
  margin-top: 5px;
`;

const RequiredLabel = styled.span`
  padding: 0 2px;
  margin-left: 5px;
  border-radius: 2px;

  font-size: 14px;
  background-color: ${({ theme }) => theme.fdk.colors.alerts.warning.lightest};
`;

const Head = styled.div`
  user-select: none;
  padding: 30px;

  cursor: pointer;
`;

const Body = styled.div`
  border-top: 1px solid ${({ theme }) => theme.fdk.colors.neutrals.lighter};
  padding: 30px;
`;

export default {
  ExpansionPanel,
  RequiredLabel,
  Title,
  Subtitle,
  Head,
  Body
};
