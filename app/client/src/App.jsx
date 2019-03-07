import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './components/NavBar';
import Main from './components/Main';
import FunFacts from './components/FunFacts';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      funfactsList: []
    };
  }

  componentDidMount() {
    axios.get('api/funfacts')
    .then(response => {
        this.setState({
            funfactsList: response.data
        });
    })
    .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="app">
        <NavBar toggle={this.toggleFunfact} />
        <Main />

      </div>
    );
  }
}


export default App
