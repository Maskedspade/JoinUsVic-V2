import React, { Component } from 'react'
import { Modal, Image, Header, Button } from 'semantic-ui-react'

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
        <Header>AboutUs</Header>
        <Modal.Content image>
          <Image wrapped size='huge' src='http://www.athomeinlove.com/wp-content/uploads/2018/04/victoria-bc.jpg'/>
          <Modal.Description className='modal-description'>
          <br/>Wanna find out more about downtownVictoria,
          <br/>but got tired of the same ol' results from Google?
          <br/>
          <br/>You've come to the right place.
          <br/>
          <br/>We are all about sharing insights and stories of the city...
          <br/>through a fun and interactive 3D model!
          <br/>
          <br/>While this model comes with no guarantee in precise geographic information, it is 100% committed to absorting first-hand experience and providing you with the most insightful information about downtown Victoria.
          <br/>We have both generic and special (aka quirky) keywords to describe fun spots in downtown Victoria, and we collect fun facts about the city as well.
          <br/>
          <br/>Whether you are a local or visitor, foodie or hispter,
          <br/>this app will help you find what you need - just give us the keywords!
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