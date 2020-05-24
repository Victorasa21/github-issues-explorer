
import React, { useState, FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Title, Form, Repositories, Error } from './style';
import logo from '../../assets/logo.svg';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  }
}
const Dashboard: React.FC = () => {

  const [ inputError, setInputError ] = useState( '' );
  const [ newRepo, setNewRepo ] = useState( '' );

  const [ repositories, setRepositories ] = useState<Repository[]>( () => {
    const storagedRepository = localStorage.getItem( '@GithubExplorer: repositories' )

    if ( storagedRepository ) {
      return JSON.parse( storagedRepository )
    } else {
      return []
    }
  } );

  useEffect( () => {
    localStorage.setItem( '@GithubExplorer: repositories', JSON.stringify( repositories ) );
  }, [ repositories ] );

  async function handleAddRepository ( event: FormEvent<HTMLFormElement> ): Promise<void> {
    event.preventDefault();

    if ( !newRepo ) {
      setInputError( 'Por favor, insira o autor/repositório para busca!' );
      return;
    }

    try {

      const response = await api.get<Repository>( `repos/${ newRepo }` );
      const repository = response.data;

      setRepositories( [ ...repositories, repository ] );
      setNewRepo( '' );
      setInputError( '' );

    } catch {
      setInputError( '' );
      setInputError( 'Puts deu falha na requisição, amigão!' );
    }

  }

  return (
    <>
      <img src={ logo } alt="background github"></img>
      <Title>Explore Repositórios no Github</Title>

      <Form hasError={ !!inputError } onSubmit={ handleAddRepository }>
        <input
          value={ newRepo }
          onChange={ ( e ) => setNewRepo( e.target.value ) }
          placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>
      { inputError && <Error>{ inputError }</Error> }
      <Repositories>
        { repositories.map( repository => (
          <Link key={ repository.full_name } to={ `/repository/${ repository.full_name }` }>

            <img src={ repository.owner.avatar_url }
              alt={ repository.owner.login }
            />
            <div>
              <strong>{ repository.full_name }</strong>
              <p>{ repository.description }</p>
            </div>

            <FiChevronRight size={ 30 } />
          </Link>
        )
        )
        }
      </Repositories>

    </>
  );
};

export default Dashboard;
