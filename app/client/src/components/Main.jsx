import React, { Component } from 'react'
import { Sidebar, Segment, Button, Dimmer, Tab } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import LocationDescription from './LocationDescription'
import ThreeContainer from './ThreeContainer'
import MainSelection from './MainSelection'

const DescriptionSidebar = ({ animation, visible, direction, panes }) => {
  return (
    <Sidebar
      inverted='true'
      vertical='true'
      animation={animation}
      visible={visible}
      direction={direction}
      width='very wide'
    >
      {(panes.length > 0) &&
        <Tab menu={{ secondary: true, pointing: true }} className="sidebar-tab-menu" panes={panes} />}
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
      dimmed: false,
      anchorsIdsStr: '',
      locationsArray: [],
      averageRatingsArray: [],
      panes: []
    }
    this.handleLocationSidebar = this.handleLocationSidebar.bind(this)
    this.hideDescription = this.hideDescription.bind(this)
  }

  // handle user clicking on location/building request, deals with anymations
  handleLocationSidebar = (animation, direction, visible, locationSelected, hideDescription) => () => {
    this.setState({
      selectorShowed: !this.state.selectorShowed,
      animation,
      direction,
      visible: !visible,
      expanded: true
    })

    locationSelected.forEach((location) => {
      this.setState(state => {
        const location_info =
        {
          menuItem: {key: location.id, content:location.name},
          render: () =>
            <Tab.Pane attached={false}>
              <LocationDescription location={location} hideDescription={hideDescription}/>
            </Tab.Pane>
        }
        const panes = [...state.panes, location_info]
        // panes = [...new Set(panes)]
        console.log(panes)
        return {
          panes
        }
      })
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
    const { selectorShowed, visible, animation, direction, expanded, dimmed, anchorsIdsStr, averageRatingsArray, locationsArray, panes } = this.state

    const { keywordsList, locationsList, locationSelected } = this.props

    return (
      <div className="main-wrapper">
        <Sidebar.Pushable as={Segment}>
          <DescriptionSidebar animation={animation} visible={visible} direction={direction} locationSelected={locationSelected} hideDescription={this.hideDescription} panes={panes}/>
          <Sidebar.Pusher>
            <div className="main-model">
              <ThreeContainer />
              { selectorShowed && <MainSelection keywordsList={ keywordsList} anchorsIdsStr={anchorsIdsStr} locationsArray={locationsArray} averageRatingsArray={averageRatingsArray}/> }
              <Button className="btn-building" onClick={this.handleLocationSidebar('overlay', 'right', visible, locationSelected, this.hideDescription)}>Show</Button>
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}