import React, { Component } from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../utils/api';

import PlayerPreview from './PlayerPreview';
import Loading from './Loading';

class Results extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true,
    };
  }

  componentDidMount() {
    const players = queryString.parse( this.props.location.search );

    api.battle([
      players.playerOneName,
      players.playerTwoName,
    ]).then(
      results => {
        if ( results === null ) this.setState( _ => ({
          error: "Looks like there was an error. Check that both users exist on Github",
          loading: false,
        }));

        this.setState( _ => ({
          error: null,
          winner: results[0],
          loser: results[1],
          loading: false,
        }));
      }
    )
  }

  render() {
    const { error, winner, loser, loading } = this.state;

    if ( loading ) return <Loading text="Battling" />;

    if ( error ) {
      return (
        <div>
          <p>{ error }</p>
          <Link to="/battle">
            Reset
          </Link>
        </div>
      );
    };

    return (
      <>
        <div className="row">
          <Player
            label="Winner"
            score={ winner.score }
            profile={ winner.profile }
          />

          <Player
            label="Loser"
            score={ loser.score }
            profile={ loser.profile }
          />
        </div>

        <Link to="/battle" className="button">Battle Again</Link>
      </>
    );
  }
}

function Player( props ) {
  const { avatar_url, login: username } = props.profile;

  return (
    <div>
      <h1 className="header">{ props.label }</h1>
      <h3 style={{ textAlign: 'center' }}>Score: { props.score }</h3>
      <Profile info={ props.profile } />
    </div>
  )
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired,
}

function Profile ( props ) {
  const info = props.info;
  const { avatar_url, login: username } = info;

  return (
    <PlayerPreview avatar={ avatar_url } username={ username }>
      <ul>
        { info.name && <li>{ info.name }</li> }
        { info.location && <li>{ info.location }</li> }
        { info.company && <li>{ info.company }</li> }
        <li>Followers: { info.followers }</li>
        <li>Following: { info.following }</li>
        <li>Public Repos: { info.public_repos }</li>
        { info.blog &&
          <li>
            <a href={ info.blog } alt="Blog Link">{ info.blog }</a>
          </li>
        }
      </ul>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired
}

export default Results;
