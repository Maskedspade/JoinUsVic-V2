import React, { Component } from 'react'
import { Dropdown, Sidebar, Segment, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import LocationDescription from './LocationDescription'
import ThreeContainer from './ThreeContainer'
import MainSelection from './MainSelection'
import axios from 'axios'

const DescriptionSidebar = ({ animation, visible, direction, locationSelected }) => {
  return (
    <Sidebar
      inverted
      vertical
      animation={animation}
      visible={visible}
      direction={direction}
      width='very wide'
    >
      {locationSelected && <LocationDescription location={locationSelected} />}
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
      direction: 'right'
    }
    this.handlePush = this.handlePush.bind(this)
  }

  // handle user clicking on location/building request, deals with anymations
  handlePush = (animation, direction) => () => {
    this.setState({
      selectorShowed: !this.state.selectorShowed,
      animation,
      direction,
      visible: !this.state.visible
    })
  }

  render() {
    const { selectorShowed, visible, animation, direction } = this.state

    const { keywordsList, locationsList, locationSelected } = this.props

    return (
      <div className="main-wrapper">
        <Sidebar.Pushable as={Segment}>
          <DescriptionSidebar animation={animation} visible={visible} direction={direction} locationSelected={locationSelected}/>
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