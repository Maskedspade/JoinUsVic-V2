import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import LocationDescription from './LocationDescription';
import axios from 'axios';

export default class Yuhan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keywordsList: [],
      locationsList: [],
      locationSelected: null
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="yuhan">


      </div>
    );
  }
}