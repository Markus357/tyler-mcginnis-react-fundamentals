import React from 'react';
import PropTypes from 'prop-types';

import api from '../utils/api';

import Loading from './Loading';

function SelectLanguage( props ) {
  var languages = [ 'All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python' ];

  return (
    <ul className="languages">
      { languages.map( lang => (
        <li
          className={ lang === props.selectedLanguage ? 'selected' : '' }
          onClick={ props.onSelect.bind( null, lang ) }
          key={ lang }>

          { lang }
        </li>
      ))}
    </ul>
  );
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

function RepoGrid ( props ) {
  return (
    <ul className="popular-list">
      { props.repos.map(( repo, index ) => (
        <li key={ repo.name } className="popular-item">

          <div className="popular-rank"># { index+1 }</div>

          <ul className="space-list-items">
            <li>
              <img
                className="avatar"
                src={ repo.owner.avatar_url }
                alt={ 'Avatar for ' + repo.owner.login }
              />
            </li>
            <li><a href={ repo.html_url }>{ repo.name }</a></li>
            <li>@{ repo.owner.login }</li>
            <li>{ repo.stargazers_count } stars</li>
          </ul>

        </li>
      ) ) }
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
};

class Popular extends React.Component {
  constructor ( props ) {
    super( props );

    this.state = {
      selectedLanguage: 'All',
      repos: null,
    };
  }

  updateLanguage = lang => {
    this.setState( prev => ({ selectedLanguage: lang, repos: null }));

    api
      .fetchPopularRepos( lang )
      .then( repos => this.setState( _ => ({ repos }) ) );
  }

  componentDidMount() {
    this.updateLanguage( this.state.selectedLanguage );
  }

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={ this.state.selectedLanguage }
          onSelect={ this.updateLanguage }
        />

        { !this.state.repos
          ? <Loading text="Loading Popular Repos" />
          : <RepoGrid repos={ this.state.repos } />
        }
      </div>
    );
  }
}

export default Popular;
