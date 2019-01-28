import React from 'react';

class Popular extends React.Component {
  constructor ( props ) {
    super( props );

    this.updateLanguage = this.updateLanguage.bind( this );

    this.state = {
      selectedLanguage: 'All',
    };
  }

  updateLanguage = lang => {
    return this.setState( prev => ({ selectedLanguage: lang }));
  }

  render() {
    var languages = [ 'All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python' ];

    return (
      <ul className="languages">
        { languages.map( lang => (
          <li
            className={ lang === this.state.selectedLanguage ? 'selected' : '' }
            onClick={ this.updateLanguage.bind( null, lang ) }
            key={ lang }>
            { lang }
          </li>
        ))}
      </ul>
    );
  }
}

export default Popular;
