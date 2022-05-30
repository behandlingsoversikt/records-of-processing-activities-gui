import styled, { css } from 'styled-components';

type Variant = 'primary' | 'secondary' | 'default';

type ButtonType = {
  variant?: Variant;
  expanded?: boolean;
};

const FDKDropdownButton = styled.button<ButtonType>`
  z-index: 9001;
  position: relative;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 18px;
  border: none;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  line-height: 21px;

  min-width: 260px;

  box-shadow: 0 2px 4px rgba(45, 55, 65, 0.25);

  ${({ expanded }) =>
    expanded
      ? css`
          box-shadow: 0px 0px 3px rgba(45, 55, 65, 0.25);
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        `
      : css`
          box-shadow: 0 2px 4px rgba(45, 55, 65, 0.25);
          border-bottom-left-radius: 3px;
          border-bottom-right-radius: 3px;
        `}

  &:not(:disabled):active:focus {
    box-shadow: 0 0 0 0.2rem rgba(38, 128, 179, 0.5);
  }

  &:not(:disabled):hover {
    cursor: pointer;
  }

  background: ${({ theme }) => theme.fdk.colors.buttons.secondary.background};
  color: ${({ theme }) => theme.fdk.colors.buttons.secondary.text};

  & > svg {
    margin-right: -5px;
    font-size: 2.1rem;
  }

  & > ul {
    display: flex;
    position: absolute;
    flex-direction: column;
    background: black;
    top: 40px;
    left: 0;
    right: 0;
    text-align: left;

    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;

    box-shadow: 0 2px 4px rgba(45, 55, 65, 0.25);

    background: ${({ theme }) => theme.fdk.colors.buttons.secondary.background};
    color: ${({ theme }) => theme.fdk.colors.buttons.secondary.text};

    & > li {
      border-top: 1px solid #bfd5e1;

      & > a {
        display: flex;
        padding: 10px 18px;
      }

      & > span {
        display: flex;
        padding: 10px 18px;
      }
    }
  }
`;

const Disabled = styled.span`
  color: grey;
  cursor: auto;
`;

export default { FDKDropdownButton, Disabled };
