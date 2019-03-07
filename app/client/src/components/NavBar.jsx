import React, { Component } from 'react'
import { Menu, Image } from 'semantic-ui-react'

import '../App.css'

export default class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { activeItem } = this.state
    const { handleFunfactsDisplay, handleBackToIndex } = this.props

    return (
      <Menu className="nav-wrapper">
        <Menu.Menu position='left'>
          <Menu.Item />
          <Menu.Item
            name='logo'
            active={activeItem === 'logo'}
            content='JoinUs, Vic'
            onClick={handleBackToIndex}
          />
        </Menu.Menu>

        <Menu.Menu position='right'>
          <Menu.Item
            name='funfacts'
            active={activeItem === 'funfacts'}
            content='FunFacts'
            onClick={handleFunfactsDisplay}
          />

          <Menu.Item
            as='a'
            href='mailto:lindsey.cai94@gmail.com'
            name='contactUs'
            active={activeItem === 'contactUs'}
            content='ContactUs'
            className="nav-contact-us"
          />
          <Menu.Item />
        </Menu.Menu>
      </Menu>
    )
  }
}
