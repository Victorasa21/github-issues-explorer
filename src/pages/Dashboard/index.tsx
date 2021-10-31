import React, {useState, FormEvent, useEffect, MouseEvent} from 'react';
import { FiChevronRight, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Title, Form, Repositories, Error } from './style';
import logo from '../../assets/logo.svg';
import api from '../../services/api';
import {AiFillStar} from "react-icons/all";

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  id: string;
}

interface SearchApiResponse {
  total_count: number;
  incomplete_results: boolean;
  items: [Repository];
}

interface ReposCache {
  [id: string]: Repository;
}

const Dashboard: React.FC = () => {
  const [inputError, setInputError] = useState('');
  const [newRepo, setNewRepo] = useState('');

  const [reposCache, setReposCache] = useState<ReposCache>({});
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storedRepository = localStorage.getItem(
      '@GithubExplorer: repositories',
    );

    if (storedRepository) {
      return JSON.parse(storedRepository);
    }
    return [];
  });

  const [repoIds, setRepoIds] = useState<string[]>(() => {
    const storedIds = localStorage.getItem('@GithubExplorer: repoIds');

    if (storedIds) {
      return JSON.parse(storedIds);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('@GithubExplorer: repoIds', JSON.stringify(repoIds));
  }, [repoIds]);

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
      const repos: ReposCache = {};
      response.data.items.forEach((repoData: Repository) => {
        repos[repoData.id] = repoData;
      });

      setReposCache({
        ...reposCache,
        ...repos,
      });

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

  function handleAddRepository(repoId: string, event: MouseEvent): void {
    event.preventDefault();

    setRepositories([...repositories, reposCache[repoId]]);
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
      <div className="starred-repos">
        <Title>Repositórios favoritados</Title>
        <Repositories>
          {repositories.map((repository) => (
            <span key={repository.full_name}>
              <Link
                to={`/repository/${repository.full_name}`}
                data-testid="repo-link"
              >
                <div className="star-repo selected">
                  <AiFillStar className="starred" />
                </div>
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
      </div>
      <Repositories>
        {Object.values(reposCache).map((repository) => (
          <span key={repository.full_name}>
            <Link
              to={`/repository/${repository.full_name}`}
              data-testid="repo-link"
            >
              {/* eslint-disable-next-line */}
              <div
                className="star-repo"
                role="button"
                onClick={(e): void => handleAddRepository(repository.id, e)}
              >
                <FiStar className="not-selected" />
              </div>
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
