import React, { Component } from 'react';
import { Item, Icon } from 'semantic-ui-react';

const DescriptionCard = ( {location} ) => {
  return location ?
    (
      <Item className="ld-wrapper">
        <Item.Header as='h2'>{location.name}</Item.Header>
        <Item.Header as='a' href={location.website}>Website
          <Icon name='angle double right' />
        </Item.Header>
        <Item.Meta className="p-fade-italic
        ">{location.address}</Item.Meta>
        <Item.Extra className="p-highlight-sm">Rating: {location.rating}</Item.Extra>
        <Item.Description className="p-desktop">{location.description}</Item.Description>
        <Item.Header as='h4' className="centered">Rate me: @add stars!@</Item.Header>
        <Item.Header as='a'>
          <Icon name="caret right" />
          HideThis
        </Item.Header>
      </Item>
    ) : (
      <Item style={{ display: 'none' }}></Item>
    )
}

export default class LocationDescription extends Component {
  render() {
    return (
      <DescriptionCard location={this.props.location} />
    )
  }
}