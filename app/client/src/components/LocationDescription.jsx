import React, { Component } from 'react';
import { Item, Icon, Menu, Tab } from 'semantic-ui-react';

const DescriptionCard = ( {location, hideDescription} ) => {
  return (
    <Item className="ld-wrapper">
      <Item.Header as='h2'>{location.name}</Item.Header>
      <Item.Header as='a' href={location.website}>Website
        <Icon name='angle double right' />
      </Item.Header>
      <Item.Meta className="p-fade-italic
      ">{location.address}</Item.Meta>
      <Item.Extra className="p-highlight">Rating: {location.rating}</Item.Extra>
      <Item.Description className="p-desktop">{location.description}</Item.Description>
      <Item.Header as='h4' className="p-highlight centered">Rate me: @add stars!@</Item.Header>
      <Item.Header as='a' onClick={hideDescription}>
        <Icon name="caret right" />
        HideThis
      </Item.Header>
    </Item>
  )
}

export default class LocationDescription extends Component {
  constructor() {
    super()
    this.state = {
      panes: []
    }
  }

  loopThroughLocations = (locationSelected) => {
    locationSelected.forEach((location) => {
      this.state.panes.push(
        {
          menuItem: {key: location.id, content:location.name},
          render: () =>
            <Tab.Pane>

            </Tab.Pane>
        }
      )
    })
  }


  render() {
    const { locationSelected, hideDescription } = this.props

    return (
      <DescriptionCard location={locationSelected} hideDescription={hideDescription}/>
    )
  }
}