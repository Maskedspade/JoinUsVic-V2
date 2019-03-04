import React, { Component } from 'react';

import NavBar from './components/NavBar';
import Main from './components/Main';
import FunFacts from './components/FunFacts';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      funfact_page: false,
    };
  }

  componentDidMount() {
    // TODO: ajax call get funfacts
  }

  render() {
    return (
      <div className="app">
        <NavBar />
        <Main />
        <FunFacts />
      </div>
    );
  }
}

export default App
