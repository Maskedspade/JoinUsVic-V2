import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import LocationDescription from './LocationDescription';
import axios from 'axios';


export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
        keywordsList: [],
        locationsList: [],
        locationSelected: null
    };
  }

  componentDidMount() {
    axios.all([
      axios.get('keywords'),
      axios.get('locations')
    ])
    .then(axios.spread((keywordsRes, locationsRes) => {
      console.log(keywordsRes.data, locationsRes.data);
      this.setState({
          keywordsList: keywordsRes.data,
          locationsList: locationsRes.data,
          locationSelected: locationsRes.data[0]
      });
    }))
    // TODO: create a 404 page component to handle errors instead of console logging
    .catch(error => console.log(error));
  }

  render() {
    console.log(this.state.locationSelected)
    let options = this.state.keywordsList.map( keyword => {
        return {
            key:keyword.id,
            text:keyword.name,
            value:keyword.id
        }
    });

    return (
      <div className="main-all">
        <LocationDescription location={this.state.locationSelected}/>

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