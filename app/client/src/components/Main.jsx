import React, { Component } from 'react'
import { Sidebar, Segment, Button, Dimmer } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import LocationDescription from './LocationDescription'
import ThreeContainer from './ThreeContainer'
import MainSelection from './MainSelection'

const DescriptionSidebar = ({ animation, visible, direction, locationSelected, hideDescription }) => {
  return (
    <Sidebar
      inverted='true'
      vertical='true'
      animation={animation}
      visible={visible}
      direction={direction}
      width='very wide'
    >
      {locationSelected && <LocationDescription locationSelected={locationSelected} hideDescription={hideDescription}/>}
    </Sidebar>
  )
}

DescriptionSidebar.propTypes = {
  animation: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired
}

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectorShowed: true,
      visible: false,
      animation: 'overlay',
      direction: 'right',
      expanded: false,
      dimmed: false
    }
    this.handlePush = this.handlePush.bind(this)
    this.hideDescription = this.hideDescription.bind(this)
  }

  // handle user clicking on location/building request, deals with anymations
  handlePush = (animation, direction) => () => {
    this.setState({
      selectorShowed: !this.state.selectorShowed,
      animation,
      direction,
      visible: !this.state.visible,
      expanded: true
    })
  }

  hideDescription = () => {
    this.setState({
      selectorShowed: true,
      visible: false,
      expanded: false
    })
  }

  render() {
    const { selectorShowed, visible, animation, direction, expanded, dimmed } = this.state

    const { keywordsList, locationsList, locationSelected } = this.props

    return (
      <div className="main-wrapper">
        { dimmed && <Dimmer active />}
        <Sidebar.Pushable as={Segment}>
          <DescriptionSidebar animation={animation} visible={visible} direction={direction} locationSelected={locationSelected} hideDescription={this.hideDescription}/>
          <Sidebar.Pusher>
            <div className="main-model">
              <ThreeContainer />
              { selectorShowed && <MainSelection keywordsList={ keywordsList } /> }
              <Button className="btn-building" onClick={this.handlePush('overlay', 'right')}>Show</Button>
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}