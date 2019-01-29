import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    const {
      playerOneName,
      playerTwoName,
      playerOneImage,
      playerTwoImage } = this.state;

    return (
      <div>
        <div className="row">

          { playerOneName
            ? <PlayerPreview
                id="playerOne"
                avatar={ playerOneImage }
                username= { playerOneName }
                onReset={ this.handleReset }
              />
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
                onReset={ this.handleReset }
              />
            : <PlayerInput
                id="playerTwo"
                label="Player Two"
                onSubmit={ this.handleSubmit }
              />
          }

        </div>
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

function PlayerPreview( props ) {
  return (
    <div>
      <div className="column">
        <img
          className="avatar"
          src={ props.avatar }
          alt={ 'Avatar for ' + props.username }
        />
        <h2 className="username">@{ props.username }</h2>
        <button className="reset" onClick={ props.onReset.bind( null, props.id ) }>
          Reset
        </button>
      </div>
    </div>
  );
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
}

export default Battle;
