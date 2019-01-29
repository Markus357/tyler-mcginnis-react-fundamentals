import React from 'react';
import Nav from './Nav';
import Home from './Home'
import Popular from './Popular'
import Battle from './Battle'

const ReactRouter = require('react-router-dom');
const Router = ReactRouter.BrowserRouter;
const Route = ReactRouter.Route;
const Switch = ReactRouter.Switch;

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Nav />

          <Switch>
            <Route exact path='/' component={ Home } />
            <Route path='/battle' component={ Battle } />
            <Route path='/popular' component={ Popular } />
            <Route render={ () => <p>Not Found</p> } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;