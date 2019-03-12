import React, { Component } from 'react'
import { Modal, Image, Header } from 'semantic-ui-react'

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
        <Header>A Disclaimer for You</Header>
        <Modal.Content image>
          <Image wrapped size='huge' src='https://i.pinimg.com/originals/80/bf/8c/80bf8c61bd32d5bda30923d1510baab3.jpg'/>
          <Modal.Description className='modal-description'>
          Hey! It's Lindsey and Yuhan! Great to see you here <span role="img" aria-label="emoji">😃</span>. <br/>We just wanted to let you know that this 3D model of Victoria is by no means the latest update or the most precise, but it is certainly a master piece by Yuhan during her architecture studies.
          <br/>We made this web app to showcase some of the fun places to do fun things, coming from us - the two people that don't go out all that much <span role="img" aria-label="emoji">🤯</span>.
          <br/>So please don't take us seriously, but still enjoy the super fun interactive 3D model. Hopefully you can learn a thing or two even when the model is completely outdated later on *cough*
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Header as='a'
            icon='paper plane'
            href='mailto:lindsey.cai94@gmail.com,yhfreeman12@gmail.com'
            content='EmailUs'
            className='modal-email-link'
          />
        </Modal.Actions>
      </Modal>
    )
  }
}