import { createGlobalStyle } from 'styled-components'
import githubBackground from '../assets/github_img.svg'

export default createGlobalStyle`
*{
  margin:0;
  padding:0;
  outline:0;
  box-sizing: border-box;
}

body {
  background:#F0F0F5 url(${githubBackground}) no-repeat 70% top;
  -webkit-font-smoothing: antialiased;
}

body, input, button {
  font-family: 'Roboto', sans-serif;
}

#root {
  max-width:960px;
  margin: 0 auto;
  padding: 40px 20px
}

button {
  cursor:pointer
}

.star-repo {
  flex: 0 !important;
}

svg.starred {
  fill: #ffe600;
  width: 30px;
  height: 30px;
}

svg.not-selected {
  width: 30px;
  height: 30px;
}
`
