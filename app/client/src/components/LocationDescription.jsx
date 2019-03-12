import React, { Component } from 'react';
import { Item, Icon, Rating } from 'semantic-ui-react';

const DescriptionCard = ( {location, hideDescription} ) => {
  return (
    <Item className="ld-wrapper">
      <Item.Header as='h2'>{location.name}</Item.Header>
      {location.website && <Item.Header as='a' href={location.website} target='_blank'>Website
        <Icon name='angle double right' />
      </Item.Header>}
      <Item.Meta className="p-fade-italic
      ">{location.address}</Item.Meta>
      <Item.Extra className="p-highlight">Rating: &nbsp;&nbsp; {location.rating}</Item.Extra>
      <Item.Description className="p-desktop">{location.description}</Item.Description>
      <Item.Header as='h4' className="p-highlight centered">
        Rate this location:&nbsp;&nbsp;
        <Rating icon='star' defaultRating={0} maxRating={5} size='huge'></Rating>
      </Item.Header>
    </Item>
  )
}

export default class LocationDescription extends Component {

  render() {
    const { location, hideDescription} = this.props

    return (
      <DescriptionCard location={location} />
    )
  }
}