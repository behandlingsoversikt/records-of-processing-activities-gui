import { css } from 'styled-components';

export default css`
  html {
    font-size: 62.5%;
  }

  html,
  body {
    height: 100%;
  }

  body {
    color: ${({ theme }) => theme.fdk.colors.text.default};
    font-size: 1.6rem;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  body,
  #root {
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
  }

  body.no-scroll {
    overflow: hidden;
  }

  a:focus,
  button:focus,
  input:focus,
  textarea:focus,
  summary:focus-visible,
  tr:focus-visible {
    outline: 2px auto blue;
  }
`;
