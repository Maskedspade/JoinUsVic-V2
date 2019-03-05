import React, { Component } from 'react';
import { Dropdown, Sidebar, Segment, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import LocationDescription from './LocationDescription';
import ThreeContainer from './ThreeContainer';
import axios from 'axios';


export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
        keywordsList: [],
        locationsList: [],
        locationSelected: null,
        visible: false,
        animation: 'push'
    };
  }

  componentDidMount() {
    axios.all([
      axios.get('keywords'),
      axios.get('locations')
    ])
    .then(axios.spread((keywordsRes, locationsRes) => {
      this.setState({
          keywordsList: keywordsRes.data,
          locationsList: locationsRes.data,
          locationSelected: locationsRes.data[4]
      });
    }))
    // TODO: create a 404 page component to handle errors instead of console logging
    .catch(error => console.log(error));
  }

  render() {
    const { keywordsList, locationsList, locationSelected, visible, animation } = this.state

    const options = keywordsList.map( keyword => {
        return {
            key:keyword.id,
            text:keyword.name,
            value:keyword.id
        }
    });

    return (
      <div className="main-wrapper">

        <ThreeContainer className="three"/>

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