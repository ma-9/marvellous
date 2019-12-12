import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layouts/Spinner';
import { connect } from 'react-redux';
import { getGithubRepos } from '../../actions/profile';

const ProfileGithub = ({ username, getGithubRepos, repos, isLoaded }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);
  if (isLoaded) {
    return <Spinner />;
  }
  return (
    <div className='profile-github'>
      <h2 className='text-primary my-1'>Github Repositories</h2>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map((repo) => (
          <div key={repo.id} className='repo bg-white p-1 my-1'>
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {repo.name}
                </a>
              </h4>
              <p> {repo.description} </p>
            </div>
            <div>
              <ul>
                <li className='badge badge-primary'>
                  Stars: {repo.stargazers_count}
                </li>
                <li className='badge badge-dark'>
                  Watchers: {repo.watchers_count}
                </li>
                <li className='badge badge-light'>Forks: {repo.forks_count}</li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
  isLoaded: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
  isLoaded: state.profile.loading
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
