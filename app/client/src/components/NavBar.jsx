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
            name='aboutus'
            active={activeItem === 'aboutus'}
            content='AboutUs'
            onClick={handleAboutUsDisplay}
            className="nav-about-us"
          />
          <Menu.Item />
        </Menu.Menu>
      </Menu>
    )
  }
}
