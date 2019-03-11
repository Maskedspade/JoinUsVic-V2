import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './components/NavBar';
import Main from './components/Main';
import FunFacts from './components/FunFacts';
import { Dimmer, Loader } from 'semantic-ui-react'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded_json: false,
      loaded_model: false,
      keywordsList: [],
      funfactsList: [],
      funfactsDisplayed: false
    };

    this.handleFunfactsDisplay = this.handleFunfactsDisplay.bind(this)
    this.handleBackToIndex = this.handleBackToIndex.bind(this)
    this.modelLoaded = this.modelLoaded.bind(this)
  }

  // load 3 database tables and set loading state
  componentDidMount() {
    axios.all([
      axios.get('api/keywords'),
      axios.get('api/funfacts')
    ])
    .then(axios.spread((keywordsRes, locationsRes, funfactsRes) => {
      this.setState({
          keywordsList: keywordsRes.data,
          funfactsList: funfactsRes.data,
          loaded_json: true
      })
    }))
    .catch(error => console.log(error))
  }

  modelLoaded = () => {
    this.setState({
      loaded_model: true
    })
  }

  handleFunfactsDisplay = (e) => {
    this.setState({
      funfactsDisplayed: true
    })
    e.preventDefault()
  }

  handleBackToIndex = (e) => {
    this.setState({
      funfactsDisplayed: false
    })
    e.preventDefault()
  }

  render() {
    console.log('APP GOT RE-RENDERED');

    const { loaded_json, loaded_model, keywordsList, funfactsList, funfactsDisplayed } = this.state

    return (
      <div className="app">
      {!(loaded_json && loaded_model) &&
        <div className="app-dimmer">
          <Dimmer active>
            <Loader indeterminate>Give us a sec...</Loader>
          </Dimmer>
        </div>
      }
        <NavBar handleFunfactsDisplay={ this.handleFunfactsDisplay } handleBackToIndex={ this.handleBackToIndex }/>
        <Main keywordsList={ keywordsList } modelLoaded={this.modelLoaded}/>
        { funfactsDisplayed &&
        <FunFacts funfactsList={ funfactsList }/>
        }
      </div>
    )
  }
}


export default App

