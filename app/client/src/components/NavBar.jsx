import React, { Component } from 'react'
import { Menu, Image } from 'semantic-ui-react'

import '../App.css'

export default class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  handleItemClick = (e, { name }) => {
    this.setState({
      activeItem: name
    })
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
            name='contactUs'
            active={activeItem === 'contactUs'}
            content='ContactUs'
            onClick={this.handleItemClick}
          />
          <Menu.Item />
        </Menu.Menu>
      </Menu>
    )
  }
}
