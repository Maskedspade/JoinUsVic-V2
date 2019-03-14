import React, { Component } from 'react'
import { Form, Button, TextArea, Icon } from 'semantic-ui-react'
import axios from 'axios'

const FormCard = ({ handleNevermind, handleFormSubmit, getUserName, getMessage, handlePush }) => {
  return (
    <Form onSubmit={handleFormSubmit}>
      <Button id="ff-sidebar-hide" onClick={handlePush('push', 'left')}>
        <Icon name="caret left" />
        HideThis
      </Button>
      <Form.Field>
        <label className="ff-form-label">Your name (optional): </label>
        <input
          placeholder='Your name...'
          name='username'
          onChange={getUserName}
        />
      </Form.Field>
      <Form.Field required>
        <label className="ff-form-label">Fact/Message: </label>
        <TextArea
          placeholder='Leave us a fun fact or perhaps a message for everybody :)'
          name='message'
          onChange={getMessage}
        />
      </Form.Field>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Button
          icon='cancel'
          content='Nevermind'
          onClick={handleNevermind}
        />
        <Button
          type='submit'
          icon='paper plane'
          content='Send'
          id='btn-form-submit'
        />
      </div>
    </Form>
  )
}

const isEmpty = (content) => {
  if (!content) {
    return true
  }
  return (content.split(' ').join('') === '')
}

export default class FunFactForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '@Someone@',
      message: ''
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.getMessage = this.getMessage.bind(this)
    this.getUserName = this.getUserName.bind(this)
    this.handleErrors = this.handleErrors.bind(this)
    this.formIsSent = this.formIsSent.bind(this)
    this.clearSystemMessages = this.clearSystemMessages.bind(this)
  }

  handleFormSubmit = (e) => {
    e.persist()
    const { username, message } = this.state

    this.clearSystemMessages()

    const msgDiv = document.createElement("div")
    // handle message empty or message less than 10 characters errors
    this.handleErrors(message, msgDiv)

    axios.post('api/funfacts/', {
      funfact: {user_name: username, description: message, location_id: 1}
    })
    .then(res => {
      e.target[0].value = ''
      e.target[1].value = ''
      this.formIsSent(msgDiv)
      this.props.updateFunfacts(res.data)
    })
    .catch(error => console.log(error))
  }

  getUserName = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  getMessage = (e) => {
    this.setState({
      message: e.target.value
    })
  }

  handleErrors = (message, msgDiv) => {
    msgDiv.setAttribute("id", "error-message")
    if(isEmpty(message)) {
      const errorMsg = document.createTextNode("Funfact/Message cannot be blank :)")
      msgDiv.appendChild(errorMsg)
      document.querySelector("form").appendChild(msgDiv)
      return
    } else if (message.length < 10) {
      const errorMsg = document.createTextNode("Please give us more than 10 characters :) ")
      msgDiv.appendChild(errorMsg)
      document.querySelector("form").appendChild(msgDiv)
      return
    } else {
      return
    }
  }


  formIsSent = (msgDiv) => {
    msgDiv.setAttribute("id", "success-message")
    const successMsg = document.createTextNode("Your Message has been posted!")
    msgDiv.appendChild(successMsg)
    document.querySelector("form").appendChild(msgDiv)
  }

  clearSystemMessages = () => {
    let errorNode = document.getElementById("error-message")
    let successNode = document.getElementById("success-message")
    if(errorNode)
      errorNode.remove()
    if(successNode)
      successNode.remove()
  }

  render() {
    const { handleNevermind, handlePush } = this.props

    return(
      <FormCard
        handleNevermind={handleNevermind}
        handleFormSubmit={this.handleFormSubmit}
        getUserName={this.getUserName}
        getMessage={this.getMessage}
        handlePush={handlePush}
      />
    )
  }
}