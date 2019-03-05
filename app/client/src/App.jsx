import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './components/NavBar';
import Main from './components/Main';
import FunFacts from './components/FunFacts';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      funfact_page: false,
      funfactList: []
    };
  }

  componentDidMount() {
    axios.get('funfacts')
    .then(response => {
        console.log(response.data);
        this.setState({
            funfactList: response.data
        });
    })
    // TODO: create a 404 page component to handle errors instead of console logging
    .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="app">
        <NavBar />
        <Main />
        <FunFacts funfactList={this.state.funfactList}/>
      </div>
    );
  }
}

export default App
