import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background: rgb(38, 38, 38);
    color: rgb(0, 0, 0, 0.8);
    font-size: 10px;
    font-family: "Rubik", sans-serif;
  }
`

export default GlobalStyle;
