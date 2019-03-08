import React, { Component } from 'react'
import { Dropdown, Button } from 'semantic-ui-react'
import axios from 'axios'

export default class MainSelection extends Component {
  constructor(props) {
    super(props)
    this.getSelectedKeywords = this.getSelectedKeywords.bind(this)
    this.getLocationsOnKeywords = this.getLocationsOnKeywords.bind(this)
  }

  getSelectedKeywords = (e, {value}) => {
    this.setState({ value })
  }

  // handles user's keyword selection
  // the value is an array of keyword id in database
  // tracks locations correlated to keywords
  getLocationsOnKeywords = (e) => {
    const keys = this.state.value
    axios.post('api/locations/highlighted', { keywordIds: { keys } })
    .then(response => {
      document.getElementById('messager').dataset.highlights = response.data
    })
    .catch(error => console.log(error))
  }

  render() {
    const { keywordsList, value } = this.props

    const options = keywordsList.map( keyword => {
      return {
        key:keyword.id,
        text:keyword.name,
        value:keyword.id
      }
    })

    return (
      <div className="main-selection">
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