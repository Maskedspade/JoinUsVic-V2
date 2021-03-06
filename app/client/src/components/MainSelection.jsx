import React, { Component } from 'react'
import { Dropdown, Button, Checkbox, Modal } from 'semantic-ui-react'
import axios from 'axios'

export default class MainSelection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      size: 'mini',
      selectionModalOpen: false
    }
    this.getSelectedKeywords = this.getSelectedKeywords.bind(this)
    this.fetchData = this.fetchData.bind(this)
    this.allOrFiltered.bind(this)
    this.closeModal = this.closeModal.bind(this)
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
  fetchData = (e) => {
    const keys = this.state.value

    if (!keys) {
      this.setState({
        selectionModalOpen: true
      })
      return;
    }

    this.props.callLoader()
    const bool = this.state.filtered
    axios.post('api/locations/highlighted', { keywordIds: { keys }, filtered: { bool }
    })
    .then(res => {
      document.getElementById('messager').dataset.highlights = res.data.anchors_ids_str
      this.props.getLocationsOnKeywords(res.data.anchors_ids_str, res.data.locations_array, res.data.average_ratings_array)
      this.props.callLoader()
    })
    .catch(error => console.log(error))
  }

  closeModal = () => this.setState({ selectionModalOpen: false})

  render() {
    const { keywordsList } = this.props
    const { selectionModalOpen, size } = this.state

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
          <Button className="btn-dark" onClick={this.fetchData}>Go</Button>
        </div>

        <Modal size={size} open={selectionModalOpen}>
          <Modal.Header>
            Missing keywords selection...
          </Modal.Header>
          <Modal.Content>
            <p>Please give us at least one keyword :) </p>
          </Modal.Content>
          <Modal.Actions labelPosition='right'>
            <Button className="btn-dark" onClick={this.closeModal}>
              GotIt
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}