import React, { Component } from 'react'
import { Container, Divider, Icon, Sidebar, Button, Responsive } from 'semantic-ui-react'
import FunFactForm from './FunFactForm'
import PropTypes from 'prop-types'

const FunFactsBlocks = ( {funfacts} ) => {
  return funfacts.map((funfact, i) => {
    return (
      <Container key={i} textAlign='justified' className="ff-container">
        <b className="p-highlight">{funfact.user_name} says: </b>
        <p className="p-fade-italic">{funfact.created_at}</p>
        <Divider />
        <p className="p-desktop">{funfact.description}</p>
      </Container>
    )
  })
}

const FormSidebar = ({ animation, visible, direction, handleNevermind, width, handleScreenChange }) => {
  return (
    <Responsive fireOnMount onUpdate={handleScreenChange}>
      <Sidebar
        animation='push'
        visible={visible}
        direction={direction}
        vertical="true"
        width={width}
        id="ff-sidebar"
      >
        <FunFactForm
          handleNevermind={handleNevermind}
        />
      </Sidebar>
    </Responsive>
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
      direction: 'left'
    }
    this.handlePush = this.handlePush.bind(this)
    this.handleNevermind = this.handleNevermind.bind(this)
    this.handleScreenChange = this.handleScreenChange.bind(this)
  }

  handlePush = (animation, direction) => () => {
    this.setState({
      animation,
      direction,
      visible: !this.state.visible
    })
  }

  handleNevermind = () => {
    this.setState({
      visible: false
    })
  }

  handleScreenChange = (e, {width}) => {
    this.setState({ width })
  }

  render() {
    const { visible, animation, direction, width } = this.state
    const { funfactsList } = this.props

    const sidebarWidth = width <= Responsive.onlyMobile.minWidth ? 'wide' : 'very wide'

    return (
      <div className="ff-wrapper">

          <FormSidebar
            animation={animation}
            visible={visible}
            direction={direction}
            handleNevermind={this.handleNevermind}
            handleScreenChange={this.handleScreenChange}
            width={sidebarWidth}
          />

          <Sidebar.Pusher>
            <Container textAlign='justified'>
              { visible ?
                ( <Button id="ff-sidebar-link" onClick={this.handlePush('push', 'left')}>
                  <Icon name="caret left" />
                  Nevermind...
                </Button> ) :
                ( <Button id="ff-sidebar-link" onClick={this.handlePush('push', 'left')}>
                <Icon name="caret right" />
                Have any fun facts for us?
              </Button> )
              }
              <FunFactsBlocks funfacts={funfactsList}/>
            </Container>
          </Sidebar.Pusher>

      </div>
    )
  }
}