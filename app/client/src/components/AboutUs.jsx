import React, { Component } from 'react'
import { Modal, Image, Header, Button, Icon } from 'semantic-ui-react'

export default class AboutUs extends Component {
  render() {
    const { aboutUsDisplayed, closeAboutUsDisplay } = this.props

    return (
      <Modal
        open={aboutUsDisplayed}
        onClose={closeAboutUsDisplay}
        basic
        size='medium'
      >
        <Header>This is a Disclaimer</Header>
        <Modal.Content image>
          <Image wrapped size='huge' src='https://i.pinimg.com/originals/80/bf/8c/80bf8c61bd32d5bda30923d1510baab3.jpg'/>
          <Modal.Description className='modal-description'>&nbsp;&nbsp;&nbsp;&nbsp;Wanna find out more about downtownVictoria, but got tired of the same ol' results from the internet? You've come to the right place. We are all about sharing insights and stories of the city...through a fun and interactive 3D model - though no guarantee in precise geographic information, it is 100% committed to absorting first-hand experience and providing you with the most insightful Victoria info. <br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;We have both generic and special (aka quirky) keywords to describe fun spots in downtown Victoria, and we collect fun facts about the city as well. Whether you are a local or visitor, foodie or hispter, this app will help you find what you need - just give us the keywords!
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <p>Meet the Devs</p>
          <Button
            as='a'
            inverted
            size='large'
            href='https://github.com/Maskedspade'
            target='_blank'
            className='modal-btn-github'
          >
            <Icon name='github' />
            Lindsey
          </Button>
          <Button
            as='a'
            inverted
            icon='github'
            size='large'
            href='https://github.com/yhfreeman'
            target='_blank'
            className='modal-btn-github'
          >
            <Icon name='github' />
            Yuhan
          </Button>

        </Modal.Actions>
      </Modal>
    )
  }
}