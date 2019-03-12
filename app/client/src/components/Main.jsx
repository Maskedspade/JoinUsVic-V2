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
      anchorsIdsStr: '',
      locationsArray: [],
      averageRatingsArray: [],
      selectedAnchorId: null,
      panes: []
    }
    this.handleLocationSidebar = this.handleLocationSidebar.bind(this)
    this.hideDescription = this.hideDescription.bind(this)
    this.getSelectedAnchorId = this.getSelectedAnchorId.bind(this)
    this.getLocationsOnKeywords = this.getLocationsOnKeywords.bind(this)
  }

  // handle user clicking on location/building request, deals with anymations
  handleLocationSidebar = (animation, direction, visible, locationsArray, hideDescription) => () => {
    this.setState({
      selectorShowed: !this.state.selectorShowed,
      animation,
      direction,
      visible: !visible,
      panes: []
    })
    locationsArray.forEach((location) => {
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
    })
  }

  getLocationsOnKeywords = (anchors, locations, ratings) => {
    this.setState({
      anchorsIdsStr: anchors,
      locationsArray: locations,
      averageRatingsArray: ratings
    })
  }

  getSelectedAnchorId = (anchorId) => {
    this.setState({
      selectedAnchorId: anchorId,
    })
  }

  render() {
    const { selectorShowed, visible, animation, direction, anchorsIdsStr, averageRatingsArray, locationsArray, panes, selectedAnchorId } = this.state

    const { keywordsList, modelLoaded} = this.props

    // console.log(anchorsIdsStr)
    // console.log(locationsArray)
    // console.log(averageRatingsArray)

    return (
      <div className="main-wrapper">
        <Sidebar.Pushable as={Segment}>
          <DescriptionSidebar animation={animation} visible={visible} direction={direction} locationsArray={locationsArray} hideDescription={this.hideDescription} panes={panes}/>
          <Sidebar.Pusher>
            <div className="main-model">
              <ThreeContainer modelLoaded={modelLoaded} getSelectedAnchorId={this.getSelectedAnchorId} />
              { selectorShowed && <MainSelection keywordsList={ keywordsList} getLocationsOnKeywords={this.getLocationsOnKeywords}/> }
              <Button className="btn-building" onClick={this.handleLocationSidebar('overlay', 'right', visible, locationsArray, this.hideDescription)}>Show</Button>
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}