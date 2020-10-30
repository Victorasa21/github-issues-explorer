import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import App from './App';
import Routes from "./routes";

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const localStorageMock = ((): object => {
  let store: {[index: string]:any} = {
    '@GithubExplorer: repositories': JSON.stringify([{
      full_name: 'Repo de testes',
      description: 'Teste',
      owner: {
        login: 'teste123',
        avatar_url: '',
      },
    }])
  }
  return {
    getItem(key: string): object {
      return (store[key]);
    },
    setItem(key: string, value: object): void {
      store[key] = value.toString();
    },
    clear(): void {
      store = {};
    },
    removeItem(key: string): void {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('App Component', () => {
  it('should render the Dashboard at first', () => {
    render(<App />);
    const title = screen.queryByText('Explore Repositórios no Github');

    expect(title).toBeInTheDocument();
  });

  it('should render the Repository page after clicking at some repo', async () => {
    render(<App />);
    const repoLink = screen.getByTestId('repo-link');
    await userEvent.click(repoLink);
    const voltarText = screen.queryByText('voltar');

    expect(voltarText).toBeInTheDocument();
  });
});
