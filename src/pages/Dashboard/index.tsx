import React, { useState, FormEvent, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Title, Form, Repositories, Error } from './style';
import logo from '../../assets/logo.svg';
import api from '../../services/api';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface SearchApiResponse {
  total_count: number;
  incomplete_results: boolean;
  items: [Repository];
}

const Dashboard: React.FC = () => {
  const [inputError, setInputError] = useState('');
  const [newRepo, setNewRepo] = useState('');

  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storedRepository = localStorage.getItem(
      '@GithubExplorer: repositories',
    );

    if (storedRepository) {
      return JSON.parse(storedRepository);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer: repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleSearchRepos(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError('Por favor, insira o nome do repositório para busca!');
      return;
    }

    try {
      const response = await api.get<SearchApiResponse>(
        `search/repositories?q=${newRepo}`,
      );
      console.log(response);
      const repos: [Repository] = response.data.items;
      setRepositories([...repositories, ...repos]);
      setNewRepo('');
      setInputError('');
    } catch (e) {
      if (e?.response?.status === 404) {
        setInputError('Nenhum resultado encontrado!');
      } else {
        setInputError('');
        setInputError('Puts deu falha na requisição, amigão!');
      }
    }
  }

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError('Por favor, insira o autor/repositório para busca!');
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);
      const repository = response.data;

      setRepositories([...repositories, repository]);
      setNewRepo('');
      setInputError('');
    } catch (e) {
      if (e?.response?.status === 404) {
        setInputError('Repo não encontrado. Use o formato "user/repo"!');
      } else {
        setInputError('');
        setInputError('Puts deu falha na requisição, amigão!');
      }
    }
  }

  return (
    <>
      <img src={logo} alt="background github" />
      <Title>Explore Repositórios no Github</Title>

      <Form hasError={!!inputError} onSubmit={handleSearchRepos}>
        <input
          value={newRepo}
          onChange={(e): void => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}
      <Repositories>
        {repositories.map((repository) => (
          <span key={repository.full_name}>
            <Link
              to={`/repository/${repository.full_name}`}
              data-testid="repo-link"
            >
              <img
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
              />
              <div>
                <strong>{repository.full_name}</strong>
                <p>{repository.description}</p>
              </div>
              <FiChevronRight size={30} />
            </Link>
          </span>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
