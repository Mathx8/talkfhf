import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', sans-serif;
    transition: background 0.3s, color 0.3s;
    cursor: default;
  }

  h1, h2, h3, h4, h5, h6, p, span, li, label {
    cursor: default;
  }

  h1 {
    color: ${({ theme }) => theme.highlight};
  }
`;