import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Header, RepoProfile, RepoStats, Issues } from './style';
import logo from '../../assets/logo.svg';
import api from '../../services/api';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  title: string;
  user: {
    login: string;
  };
  html_url: string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    api
      .get(`/repos/${params.repository}`)
      .then((response) => setRepository(response.data));
    api
      .get(`/repos/${params.repository}/issues`)
      .then((response) => setIssues(response.data));
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={logo} alt="github" />
        <Link to="/">
          <FiChevronLeft />
          voltar
        </Link>
      </Header>

      {repository && (
        <>
          <RepoProfile>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </RepoProfile>
          <RepoStats>
            <div>
              <strong>{repository.stargazers_count}</strong>
              <p>Stars</p>
            </div>
            <div>
              <strong>{repository.forks_count}</strong>
              <p>Forks</p>
            </div>
            <div>
              <strong>{repository.open_issues_count}</strong>
              <p>Issues abertas</p>
            </div>
          </RepoStats>
        </>
      )}
      <Issues>
        {issues.map((issue) => (
          <a key={issue.id} href={issue.html_url}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
            <FiChevronRight size={30} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default Repository;
