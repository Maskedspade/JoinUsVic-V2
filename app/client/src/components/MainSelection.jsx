import React, { Component } from 'react'
import { Dropdown, Button, Checkbox } from 'semantic-ui-react'
import axios from 'axios'

export default class MainSelection extends Component {
  constructor(props) {
    super(props)
    this.getSelectedKeywords = this.getSelectedKeywords.bind(this)
    this.getLocationsOnKeywords = this.getLocationsOnKeywords.bind(this)
    this.allOrFiltered.bind(this)
  }

  getSelectedKeywords = (e, { value }) => {
    this.setState({ value })
  }

  allOrFiltered = (e, data) => {
    let filtered = data.checked
    this.setState( { filtered } )
  }

  // handles user's keyword selection
  // the value is an array of keyword id in database
  // tracks locations correlated to keywords
  getLocationsOnKeywords = (e) => {
    const keys = this.state.value
    const bool = this.state.filtered
    axios.post('api/locations/highlighted', { keywordIds: { keys }, filtered: { bool }
    })
    .then(res => {
      this.setState({
        anchorsIdsStr: res.data.anchors_ids_str,
        locationsArray: res.data.locations_array,
        averageRatingsArray: res.data.average_ratings_array
      })
    })
    .catch(error => console.log(error))
  }

  render() {
    const { keywordsList, value, filtered, anchorsIdsStr, locationsArray, averageRatingsArray } = this.props

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
        <div className="main-selection-buttons">
          <Checkbox
            slider
            label='Filter'
            onChange={this.allOrFiltered}
            className='main-selection-checkbox'
          />
          <Button onClick={this.getLocationsOnKeywords}>Go</Button>
        </div>
      </div>
    )
  }
}