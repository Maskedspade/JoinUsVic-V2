import React, { Component } from 'react'
import { Container, Divider, Icon, Sidebar, Segment } from 'semantic-ui-react'
import FunFactForm from './FunFactForm'
import PropTypes from 'prop-types'

const FunFactsBlocks = ( {funfacts} ) => {
  return funfacts.map((funfact, i) => {
    return (
      <Container textAlign='justified' className="ff-container">
        <b className="p-highlight">{funfact.user_name} says: </b>
        <p className="p-fade-italic">{funfact.created_at}</p>
        <Divider />
        <p className="p-desktop">{funfact.description}</p>
      </Container>
    )
  })
}

const FormSidebar = ({ animation, visible, direction, locationSelected }) => {
  return (
    <Sidebar
      inverted
      vertical
      animation={animation}
      visible={visible}
      direction={direction}
      width='very wide'
    >
      <FunFactForm />
    </Sidebar>
  )
}

FormSidebar.propTypes = {
  animation: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired
}

export default class FunFacts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      animation: 'push',
      direction: 'left',
      expanded: false
    }
    this.convertName = this.convertName.bind(this)
  }

  convertName = ( name ) => {
    return name === '@someone@' ? 'Someone' : name
  }

  handlePush = (animation, direction) => () => {
    this.setState({
      animation,
      direction,
      visible: !this.state.visible,
      expanded: !this.state.expanded
    })
  }

  render() {
    const { visible, animation, direction, expanded } = this.state
    const { funfactsList } = this.props

    return (
      <div className="ff-wrapper">
        <Sidebar.Pushable as={Segment}>
          <FormSidebar animation={animation} visible={visible} direction={direction} />
          <Sidebar.Pusher>
            <div className="ff-model">
              <Container textAlign='justified' className='ff-formlink'>
                { expanded ?
                  ( <a onClick={this.handlePush('push', 'left')}>
                    <Icon name="caret left" />
                    Nevermind...
                  </a> ) :
                  ( <a onClick={this.handlePush('push', 'left')}>
                  <Icon name="caret right" />
                  Have any fun facts for us?
                </a> )
                }
                <FunFactsBlocks funfacts={funfactsList}/>
              </Container>
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}