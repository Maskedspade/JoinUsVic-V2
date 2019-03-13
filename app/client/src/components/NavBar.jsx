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
    const { handleFunfactsDisplay, handleBackToIndex, handleAboutUsDisplay } = this.props

    return (
      <Menu fixed='top' className="nav-wrapper">
        <Menu.Item />
        <Menu.Item
          onClick={handleBackToIndex}>
          <Image
            src='https://i.ibb.co/1Q0q4LY/Branding.png'
            compact
            />
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item
            name='funfacts'
            active={activeItem === 'funfacts'}
            content='FunFacts'
            onClick={handleFunfactsDisplay}
          />

          <Menu.Item
            name='aboutus'
            active={activeItem === 'aboutus'}
            content='AboutUs'
            onClick={handleAboutUsDisplay}
            id="nav-about-us"
          />
          <Menu.Item />
        </Menu.Menu>
      </Menu>
    )
  }
}
