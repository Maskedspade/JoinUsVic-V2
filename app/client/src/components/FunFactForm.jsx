import React, { Component } from 'react'
import { Form, Button, Icon, TextArea } from 'semantic-ui-react'
import axios from 'axios'

const FormCard = ( {handleNevermind, clickToSubmit} ) => {
  return (
    <Form>
      <Form.Field>
        <label className="ff-form-label">Your name (optional): </label>
        <input placeholder='Your name...' />
      </Form.Field>

      <Form.Field>
        <label className="ff-form-label">Fact/Message: </label>
        <TextArea placeholder='Leave us a fun fact or perhaps a message for us :)' />
      </Form.Field>
      <div style={{display: 'flex'}}>
        <Button onClick={handleNevermind}>
          <Icon name='cancel' />
          Nevermind
        </Button>
        <Button type='submit' onClick={clickToSubmit} >
          <Icon name='paper plane' />
          Send
        </Button>
      </div>
    </Form>
  )
}

const checkEmpty = (content) => {
  if (!content) {
    return false
  }
  if (content.split(' ').join('') === '') {
    return false
  }
  return true
}

export default class FunFactForm extends Component {
  clickToSubmit() {
    let nameInput = document.querySelector("form input").value
    const factInput = document.querySelector("form TextArea").value

    if (!checkEmpty(factInput)) {
      const errorMsg = document.createElement("div")
      errorMsg.classList.add("error-message")
      const textNode = document.createTextNode("Funfact/Message cannot be blank, my friend!")
      errorMsg.appendChild(textNode)

      document.querySelector("form").appendChild(errorMsg)
      return;
    }

    let nameForSubmit

    if (!checkEmpty(nameInput)) {
      nameForSubmit = "@someone@"
    }

    axios.post('api/funfacts', { funfact: {user_name: nameInput, description: factInput}})
    .then(res => {
      // if POST success to rails db - here the child triggers a parents setState so new funfact can be rendered as well
      alert(res.data.msg)
    })
    .catch(error => console.log(error))
  }


  render() {
    const { handleNevermind } = this.props

    return(
      <FormCard handleNevermind={handleNevermind} clickToSubmit={this.clickToSubmit}/>
    )
  }
}