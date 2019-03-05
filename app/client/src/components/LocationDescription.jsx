import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

export default class LocationDescription extends Component
{
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <Header as='h1'>Location Description</Header>
    );
  }
}