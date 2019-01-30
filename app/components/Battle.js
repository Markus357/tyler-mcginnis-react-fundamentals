import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import PlayerPreview from './PlayerPreview';

class Battle extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null,
    }
  }

  handleSubmit = ( id, username ) => {
    this.setState( _ => ({
      [ id + 'Name' ]: username,
      [ id + 'Image' ]: `https://github.com/${ username }.png?size=200`,
    }));
  }

  handleReset = ( id ) => {
    this.setState( _ => ({
      [ id + 'Name' ]: '',
      [ id + 'Image' ]: null,
    }));
  }

  render() {
    const { match } = this.props;

    const {
      playerOneName,
      playerTwoName,
      playerOneImage,
      playerTwoImage
    } = this.state;

    return (
      <div>
        <div className="row">

          { playerOneName
            ? <PlayerPreview
                id="playerOne"
                avatar={ playerOneImage }
                username= { playerOneName }
                onReset={ this.handleReset }
              >
                <button className="reset" onClick={ this.handleReset.bind( null, 'playerOne' ) }>
                  Reset
                </button>
              </PlayerPreview>

            : <PlayerInput
                id="playerOne"
                label="Player One"
                onSubmit={ this.handleSubmit }
              />
          }

          { playerTwoName
            ? <PlayerPreview
                id="playerTwo"
                avatar={ playerTwoImage }
                username= { playerTwoName }
              >
                <button className="reset" onClick={ this.handleReset.bind( null, 'playerTwo' ) }>
                  Reset
                </button>
              </PlayerPreview>

            : <PlayerInput
                id="playerTwo"
                label="Player Two"
                onSubmit={ this.handleSubmit }
              />
          }

        </div>

        { playerOneImage && playerTwoImage &&
          <Link
            className="button"
            to={{
              pathname: match.url + '/results',
              search: `?playerOneName=${ playerOneName }&playerTwoName=${ playerTwoName }`
            }}>
            Battle
          </Link>
        }
      </div>
    );
  }
}

class PlayerInput extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      username: '',
    }
  }

  handleChange = e => {
    const value = e.target.value;

    this.setState( _ => ({
      username: value,
    }));
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(
      this.props.id,
      this.state.username
    );
  }

  render() {
    return (
      <form className="column" onSubmit={ this.handleSubmit }>

        <label className="header" htmlFor="username">
          { this.props.label }
        </label>

        <input
          id="username"
          placeholder="github username"
          type="text"
          autoComplete="off"
          value={ this.state.username }
          onChange={ this.handleChange }
        />

        <button
          className="button"
          type="submit"
          disabled={ !this.state.username }
        >
          Submit
        </button>
      </form>
    );
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default Battle;
