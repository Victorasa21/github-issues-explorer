import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './index';

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

describe('Dashboard Component', () => {
  it('should render the title', () => {
    render(<Dashboard />);
    const title = screen.queryByText('Explore Repositórios no Github');

    expect(title).toBeInTheDocument();
  });

  it('should render the repos stored on localStorage', () => {
    render(<Dashboard />);
    const repoName = screen.queryByText('Repo de testes');

    expect(repoName).toBeInTheDocument();
  });
});
