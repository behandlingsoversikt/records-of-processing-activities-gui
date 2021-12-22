import styled, { css } from 'styled-components';

import { theme } from '@fellesdatakatalog/theme';

import Common from '../common/styled';
import FDKButton from '../fdk-button';

const onMobileView = '@media (max-width: 900px)';

const StatusBar = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 64px;
  background: ${({ theme: customTheme }) =>
    customTheme.fdk.colors.neutrals.skyblue};
  border-top: 1px solid
    ${({ theme: customTheme }) => customTheme.fdk.colors.neutrals.lightblue};
  z-index: 9001;
`;

const StatusBarBody = styled(Common.Container)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  ${onMobileView} {
    font-size: ${theme.fontSize('FS12')};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const StatusButton = styled(FDKButton)<{ selected?: boolean }>`
  border-radius: 0;

  &:first-of-type {
    border-radius: 3px 0 0 3px;
  }

  &:last-of-type {
    border-radius: 0 3px 3px 0;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
      cursor: not-allowed;
    `}

  ${({ selected }) =>
    selected &&
    css`
      cursor: default !important;
    `}
`;

const RemoveButton = styled.button<{ disabled?: boolean }>`
  margin-left: 8px;
  color: ${({ theme: customTheme }) => customTheme.fdk.colors.text.link};

  &:hover {
    text-decoration: underline;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
      cursor: not-allowed;

      &:hover {
        text-decoration: none;
      }
    `}
`;

const ConfirmButton = styled(FDKButton)``;

const CancelButton = styled(RemoveButton)``;

export default {
  StatusBar,
  StatusBarBody,
  ButtonGroup,
  StatusButton,
  RemoveButton,
  ConfirmButton,
  CancelButton
};
