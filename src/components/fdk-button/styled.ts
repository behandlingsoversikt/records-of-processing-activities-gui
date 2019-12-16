import styled, { css } from 'styled-components';

const FDKButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  display: inline-flex;
  padding: 12px 18px;
  outline: none;
  border: none;
  border-radius: 3px;
  box-shadow: 0 2px 4px rgba(45, 55, 65, 0.25);

  &:not(:disabled):active:focus {
    box-shadow: 0 0 0 0.2rem rgba(38, 128, 179, 0.5);
  }

  &:not(:disabled):hover {
    cursor: pointer;
  }

  ${({ variant, theme }) => {
    const buttonStyles = theme.fdk.colors.buttons;
    switch (variant) {
      case 'primary': {
        return css`
          background: ${buttonStyles.primary.background};
          color: ${buttonStyles.primary.text};
        `;
      }
      default:
        return css`
          background: ${buttonStyles.secondary.background};
          color: ${buttonStyles.secondary.text};
        `;
    }
  }}
`;

export default { FDKButton };
