import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import LocationDescription from './LocationDescription';
import axios from 'axios';


export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
        keywordList: []
    }
  }

  componentDidMount() {
    axios.get('keywords')
    .then(response => {
        console.log(response.data);
        this.setState({
            keywordList: response.data
        });
    })
    // TODO: create a 404 page component to handle errors instead of console logging
    .catch(error => console.log(error));
  }

  render() {
    let options = this.state.keywordList.map( keyword => {
        return {
            key:keyword.id,
            text:keyword.name,
            value:keyword.id
        }
    });

    return (
      <div className="main-all">
        <LocationDescription />
        <Dropdown
            fluid
            multiple
            selection
            placeholder='What can Victoria offer you today? ...'
            options={options}
            className="main-dropdown"
        />
      </div>
    );
  }
}

