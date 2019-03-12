import React, { Component } from 'react'
import { Sidebar, Segment, Button, Dimmer, Tab, Loader, Header, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import LocationDescription from './LocationDescription'
import ThreeContainer from './ThreeContainer'
import MainSelection from './MainSelection'

const DescriptionSidebar = ({ animation, visible, direction, hideDescription, panes, sidebarLoaded }) => {
  return (
    <Sidebar
      inverted='true'
      vertical='true'
      animation={animation}
      visible={visible}
      direction={direction}
      width='very wide'
    >
      {!sidebarLoaded &&
        <div className="app-dimmer">
          <Dimmer active>
            <Loader inverted content>Getting back to you now...</Loader>
          </Dimmer>
        </div>
      }
      <div className="sidebar-tab-menu">
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        <a onClick={hideDescription} className="sidebar-hidethis">
          <Icon name="caret right" />
          HideThis
        </a>
      </div>
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
      sidebarLoaded: false,
      selectorShowed: true,
      visible: false,
      animation: 'overlay',
      direction: 'right',
      anchorsIdsStr: '',
      locationsArray: [],
      averageRatingsArray: [],
      selectedAnchorId: null,
      selectedArray: [],
      panes: []
    }
    this.handleLocationSidebar = this.handleLocationSidebar.bind(this)
    this.hideDescription = this.hideDescription.bind(this)
    this.getSelectedAnchorId = this.getSelectedAnchorId.bind(this)
    this.getLocationsOnKeywords = this.getLocationsOnKeywords.bind(this)
    this.handleAnchorClick = this.handleAnchorClick.bind(this)
  }

  // handle user clicking on location/building request, deals with animations
  handleLocationSidebar = (animation, direction, visible, locationsArray, hideDescription) => () => {
    this.setState({
      selectorShowed: !this.state.selectorShowed,
      animation,
      direction,
      visible: !visible,
      panes: []
    })
    // puts all anchor correlated locations inside of the sidebar tab panes array, sets panes array state
    locationsArray.forEach((location) => {
      this.setState(state => {
        const location_info =
        {
          menuItem: {key: location.id, content:location.name},
          render: () =>
            <Tab.Pane attached={false}>
              <LocationDescription location={location} />
            </Tab.Pane>
        }
        const panes = [...state.panes, location_info]
        return {
          panes
        }
      })
    })

    this.setState({
      sidebarLoaded: true
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
    let selected = []
    this.state.locationsArray.forEach(location => {
      if (location.anchor_id === Number(anchorId)) {
        selected.push(location)
      }
    })
    this.setState({
      selectedAnchorId: anchorId,
      selectedArray: selected
    })
  }

  handleAnchorClick = () => {
    this.handleLocationSidebar('overlay', 'right', this.state.visible, this.state.selectedArray, this.hideDescription)
  }

  render() {
    const { sidebarLoaded, selectorShowed, visible, animation, direction, anchorsIdsStr, averageRatingsArray, locationsArray, panes, selectedAnchorId, selectedArray } = this.state

    const { keywordsList, modelLoaded} = this.props


    return (
      <div className="main-wrapper">
        <Sidebar.Pushable as={Segment}>
          <DescriptionSidebar animation={animation} visible={visible} direction={direction} locationsArray={selectedArray} hideDescription={this.hideDescription} panes={panes} sidebarLoaded={sidebarLoaded}/>
          <Sidebar.Pusher dimmed={visible}>
            <div className="main-model">
              <ThreeContainer modelLoaded={modelLoaded} getSelectedAnchorId={this.getSelectedAnchorId} handleAnchorClick={this.handleAnchorClick}/>
              { selectorShowed && <MainSelection keywordsList={ keywordsList} getLocationsOnKeywords={this.getLocationsOnKeywords}/> }
              <Button className="btn-building" onClick={this.handleLocationSidebar('overlay', 'right', visible, selectedArray, this.hideDescription)}>Show</Button>
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}