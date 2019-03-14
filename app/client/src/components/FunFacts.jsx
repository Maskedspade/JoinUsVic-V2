import React, { Component } from 'react'
import { Container, Divider, Icon, Sidebar, Button } from 'semantic-ui-react'
import FunFactForm from './FunFactForm'
import PropTypes from 'prop-types'
import axios from 'axios'

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

const FormSidebar = ({ animation, visible, direction, handleNevermind, updateFunfacts, handlePush }) => {
  return (
    <Sidebar
      animation='push'
      visible={visible}
      direction={direction}
      vertical="true"
      id="ff-sidebar"
    >
      <FunFactForm
        handleNevermind={handleNevermind}
        updateFunfacts={updateFunfacts}
        handlePush={handlePush}
      />
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
      funfactsList: []
    }
    this.handlePush = this.handlePush.bind(this)
    this.handleNevermind = this.handleNevermind.bind(this)
    this.updateFunfacts = this.updateFunfacts.bind(this)
  }

  componentDidMount() {
    const { callLoader} = this.props;

    callLoader()
    axios.get('api/funfacts')
    .then(res => {
      this.setState({
        funfactsList: res.data,
      })
      callLoader()
    })
    .catch(error => console.log(error))
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

  updateFunfacts = (newFunfact) => {
    let list = this.state.funfactsList.map((x)=> x)
    list.push(newFunfact)

    list.sort((a,b) => {
      return b.id - a.id
    })

    this.setState({
      visible: true,
      funfactsList: list
    })
  }

  render() {
    const { visible, animation, direction, funfactsList } = this.state

    return (
      <div className="ff-wrapper">
        <FormSidebar
          animation={animation}
          visible={visible}
          direction={direction}
          handleNevermind={this.handleNevermind}
          updateFunfacts={this.updateFunfacts}
          handlePush={this.handlePush}
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