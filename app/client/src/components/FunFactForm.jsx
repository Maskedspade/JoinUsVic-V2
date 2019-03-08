import React, { Component } from 'react'
import { Form, Button, Icon, TextArea } from 'semantic-ui-react'

const FormCard = () => {
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
        <Button>
          <Icon name='cancel' />
          Nevermind
        </Button>
        <Button type='submit'>
          <Icon name='paper plane' />
          Send
        </Button>
      </div>
    </Form>
  )
}

export default class FunFactForm extends Component {
  render() {
    return(
      <FormCard />
    )
  }
}