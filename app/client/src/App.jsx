import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './components/NavBar';
import Main from './components/Main';
import FunFacts from './components/FunFacts';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      funfactsList: [],
      funfactsDisplayed: false
    };

    this.handleFunfactsDisplay = this.handleFunfactsDisplay.bind(this)
    this.handleBackToIndex = this.handleBackToIndex.bind(this)
  }

  componentDidMount() {
    axios.get('api/funfacts')
    .then(response => {
        this.setState({
          funfactsList: response.data
        })
    })
    .catch(error => console.log(error))
  }

  handleFunfactsDisplay = (e) => {
    this.setState({ funfactsDisplayed: true })
    e.preventDefault()
  }

  handleBackToIndex = (e) => {
    this.setState({ funfactsDisplayed: false })
    e.preventDefault()
  }

  render() {
    const { funfactsList, funfactsDisplayed } = this.state

    return (
      <div className="app">
        <NavBar handleFunfactsDisplay={this.handleFunfactsDisplay} handleBackToIndex={this.handleBackToIndex} />
        <Main />
        {funfactsList && funfactsDisplayed && <FunFacts funfactsList={this.state.funfactsList} />}
      </div>
    );
  }
}


export default App
