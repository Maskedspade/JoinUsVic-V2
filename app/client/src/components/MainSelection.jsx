import React, { Component } from 'react'
import { Dropdown, Button } from 'semantic-ui-react'
import axios from 'axios'

export default class MainSelection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedKeywords: []
    }
    this.getSelectedKeywords = this.getSelectedKeywords.bind(this)
    this.getLocationsOnKeywords = this.getLocationsOnKeywords.bind(this)
  }

  getSelectedKeywords = (e, {value}) => {
    console.log(value);
    this.setState({
      selectedKeywords: value
    })
    e.preventDefault()
  }

  // handles user's keyword selection
  // the value is an array of keyword id in database
  // tracks locations correlated to keywords
  getLocationsOnKeywords = (e) => {
    const test = this.state.selectedKeywords
    e.preventDefault()
    axios.post('api/locations/highlighted', { keywordIds: { test } })
    .then(response => {
      console.log(response)
    })
    .catch(error => console.log(error))
  }

  render() {
    const { keywordsList } = this.props

    const options = keywordsList.map( keyword => {
      return {
        key:keyword.id,
        text:keyword.name,
        value:keyword.id
      }
    })

    return (
      <div>
        <Dropdown
          fluid
          multiple
          selection
          placeholder='What can Victoria offer you today? ...'
          options={options}
          onChange={this.getSelectedKeywords}
          className="main-dropdown"
        />
        <Button onClick={this.getLocationsOnKeywords}>Go</Button>
      </div>
    )
  }
}