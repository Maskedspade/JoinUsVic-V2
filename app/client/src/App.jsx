import React, { Component } from 'react'
import axios from 'axios'
import NavBar from './components/NavBar'
import Main from './components/Main'
import FunFacts from './components/FunFacts'
import AboutUs from './components/AboutUs'
import { Dimmer, Loader } from 'semantic-ui-react'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadedJson: false,
      loadedModel: false,
      keywordsList: [],
      funfactsList: [],
      funfactsDisplayed: false,
      aboutUsDisplayed:false
    };

    this.handleFunfactsDisplay = this.handleFunfactsDisplay.bind(this)
    this.handleBackToIndex = this.handleBackToIndex.bind(this)
    this.handleAboutUsDisplay = this.handleAboutUsDisplay.bind(this)
    this.closeAboutUsDisplay = this.closeAboutUsDisplay.bind(this)
    this.modelLoaded = this.modelLoaded.bind(this)
    this.callLoader = this.callLoader.bind(this)
  }

  // load 3 database tables and set loading state
  componentDidMount() {
    axios.all([
      axios.get('api/keywords'),
      axios.get('api/funfacts')
    ])
    .then(axios.spread((keywordsRes, funfactsRes) => {
      this.setState({
          keywordsList: keywordsRes.data,
          funfactsList: funfactsRes.data,
          loadedJson: !this.state.loadedJson
      })
    }))
    .catch(error => console.log(error))
  }

  modelLoaded = () => {
    this.setState({
      loadedModel: !this.state.loadedModel
    })
  }

  handleFunfactsDisplay = (e) => {
    this.setState({
      funfactsDisplayed: true
    })
    e.preventDefault()
  }

  handleAboutUsDisplay = dimmer => () => {
    this.setState({
      funfactsDisplayed: false,
      aboutUsDisplayed: true,
      dimmer
    })
  }

  closeAboutUsDisplay = () => {
    this.setState({
      aboutUsDisplayed: false
    })
  }

  handleBackToIndex = (e) => {
    this.setState({
      funfactsDisplayed: false,
    })
    e.preventDefault()
  }

  callLoader = () => {
    this.setState({
      loadedJson: !this.state.loadedJson
    })
  }

  render() {
    const { loadedJson, loadedModel, keywordsList, funfactsList, funfactsDisplayed, aboutUsDisplayed, dimmer } = this.state

    return (
      <div className="app">
      {!(loadedJson && loadedModel) &&
        <div className="app-dimmer">
          <Dimmer active>
            <Loader indeterminate>Give us a sec...</Loader>
          </Dimmer>
        </div>
      }

        <NavBar handleFunfactsDisplay={ this.handleFunfactsDisplay } handleBackToIndex={ this.handleBackToIndex} handleAboutUsDisplay={this.handleAboutUsDisplay} />
        <Main keywordsList={ keywordsList } modelLoaded={this.modelLoaded} callLoader={this.callLoader}/>

        { funfactsDisplayed &&
        <FunFacts funfactsList={ funfactsList }/>
        }
        { aboutUsDisplayed &&
        <AboutUs aboutUsDisplayed={aboutUsDisplayed} closeAboutUsDisplay={this.closeAboutUsDisplay} dimmer={dimmer}/>
        }
      </div>
    )
  }
}


export default App

