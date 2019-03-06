import React, { Component } from 'react';
import { Menu, Image } from 'semantic-ui-react';

import '../App.css';

export default class NavBar extends Component {
  state = {}

  handleItemClick = (e, { name }) => {
    return this.setState({
      activeItem: name
    })
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu>
        <Menu.Item name='nav-logo'>
          <Image src='https://react.semantic-ui.com/images/wireframe/image.png'/>
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