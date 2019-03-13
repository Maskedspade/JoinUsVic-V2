import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

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
          <img
            src='https://i.ibb.co/tDySBVb/logo.png'
            style={{width: '4em'}}
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
