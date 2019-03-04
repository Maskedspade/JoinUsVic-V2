import React, { Component } from 'react';
import { Menu, Item, Image } from 'semantic-ui-react';

export default class NavBar extends Component {
  state = {}

  handleItemClick = (e, { name }) =>
    this.setState({ activeItem: thing })

  render() {
    const { activeItem } = this.state

    return (
      <Menu>
        <Menu.Item name='logo'>
          <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='small'/>
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item
            name='funfacts'
            active={activeItem === 'funfacts'}
            content='FunFacts'
            onClick={this.handleItemClick}
          />

          <Menu.Item
            name='contactUs'
            active={activeItem === 'contactUs'}
            content='ContactUs'
            onClick={this.handleItemClick}
          />
        </Menu.Menu>
      </Menu>
    )
  }
}
