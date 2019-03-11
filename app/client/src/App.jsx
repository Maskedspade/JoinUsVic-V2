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
      loading: true,
      keywordsList: [],
      locationsList: [],
      locationSelected: null,
      funfactsList: [],
      funfactsDisplayed: false
    };

    this.handleFunfactsDisplay = this.handleFunfactsDisplay.bind(this)
    this.handleBackToIndex = this.handleBackToIndex.bind(this)
  }

  // load 3 database tables and set loading state
  componentDidMount() {
    axios.all([
      axios.get('api/keywords'),
      axios.get('api/locations'),
      axios.get('api/funfacts')
    ])
    .then(axios.spread((keywordsRes, locationsRes, funfactsRes) => {
      this.setState({
          keywordsList: keywordsRes.data,
          locationsList: locationsRes.data,
          funfactsList: funfactsRes.data,
          locationSelected: locationsRes.data[5],
          loading: false
      })
    }))
    .catch(error => console.log(error))
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
    const { loading, keywordsList, locationsList,funfactsList, locationSelected, funfactsDisplayed } = this.state

    return (
      <div className="app">
      {loading &&
        <div className="app-dimmer">
          <Dimmer active>
            <Loader indeterminate>Give us a sec...</Loader>
          </Dimmer>
        </div>
      }
        <NavBar handleFunfactsDisplay={ this.handleFunfactsDisplay } handleBackToIndex={ this.handleBackToIndex }/>
        <Main keywordsList={ keywordsList } locationsList={ locationsList }  locationSelected={ locationSelected }/>
        { funfactsDisplayed &&
        <FunFacts funfactsList={ funfactsList }/>
        }
      </div>
    );
  }
}


export default App

