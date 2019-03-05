import React, { Component } from 'react';
import { Item } from 'semantic-ui-react';

const DescriptionCard = ( {location} ) => {
  return (
    <Item>
      HI
    </Item>
  )
}


export default class LocationDescription extends Component
{


  render() {
    const info = this.props.location;
    console.log(typeof info.name);
    return (
      <h1>hi</h1>
    )
  }
}