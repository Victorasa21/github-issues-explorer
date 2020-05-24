import styled from 'styled-components'


export const Header = styled.header`
display:flex;
align-items:center;

  img {
    margin-right:auto;
  }

  a {
    display:flex;
    font-size:15px;
    align-items:center;
    text-decoration:none;
    color:#a8a8b3;
    transition:color 0.2s;

    &:hover{
    color:#666;
  }
  }


  svg{
    margin-right:4px;
  }


`

export const RepoProfile = styled.section`
  margin-top:80px;
  display:flex;
  align-items:center;

  img {
    border-radius:50%;
    width:120px;
    height:120px;
  }

  div{
    margin-left:24px;
  }

  strong{
    font-size:36px;
    color:#3d3d4d;
  }

  p{
    font-size:18px;
    margin-top: 4px;
    color:#6c6c80;
  }
`

export const RepoStats = styled.section`
display:flex;
margin-top:40px;
padding:10px;

div{
  display:flex;
  flex-direction:column;
  align-items:center;
  margin-right:30px;
}

strong{
  display:block;
  font-size: 36px;
  color:#3d3d4d;
}
p{
  display:block;
  margin-top:4px;
  color:#6c6c80;
}
`
export const Issues = styled.div`
  margin-top: 80px;

  a {
    background-color: #fff;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: transform 0.2s;
    color:#a8a8b3;

    &:hover {
      transform: translateX(10px);
    }

    & + a {
      margin-top: 16px;
    }

    div {
      margin: 0 16px;
      flex: 1;

      strong {
        font-size: 20px;
        color: #3d3d4d;
      }

      p {
        font-size: 15px;
        color: #a8a8b3;
        margin-top: 4px;
      }

      svg {
        margin-left: auto;
        color: #cbcbd6;
      }
    }
  }
`
