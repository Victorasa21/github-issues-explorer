/* eslint-disable */

import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface FromProps {
  hasError: boolean;
}

export const Title = styled.h1`
  margin-top: 40px;
  max-width: 450px;
  font-size: 50px;
  color: #3a3a3a;
`;

export const Button = styled.div`
  margin-top: 40px;
  max-width: 450px;
  font-size: 20px;
  color: #3a3a3a;
  cursor: pointer;
`;

export const FavoritesHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const Form = styled.form<FromProps>`
  margin-top: 40px;
  width: 700px;

  display: flex;

  @media (max-width: 740px) {
    width: 100%;
    height: 70px;
    flex-direction: column;
  }

  input {
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border: 0;
    border-radius: 5px 0 0 5px;
    color: #3a3a3a;
    border: 2px solid #fff;
    border-right: 0px;
    ${(props) =>
      props.hasError &&
      css`
        border-color: red;
      `}

    &::placeholder {
      color: #a8a8b3;
    }

    @media (max-width: 740px) {
      height: 40px;
    }
  }

  button {
    width: 210px;
    height: 70px;
    background: #04d361;
    border-radius: 0 5px 5px 0;
    border: 0;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#04d361')};
    }

    @media (max-width: 740px) {
      width: 100%;
      height: 30px;
    }
  }
`;

export const Error = styled.span`
  color: red;
  display: block;
  margin-top: 8px;
`;
export const Repositories = styled.div`
  margin-top: 80px;
  max-width: 700px;

  a {
    background-color: #fff;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: transform 0.2s;
    color: #a8a8b3;

    &:hover {
      transform: translateX(10px);
    }

    & + a {
      margin-top: 16px;
    }
    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }

    div {
      margin: 0 16px;
      flex: 1;

      strong {
        font-size: 18px;
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
`;
