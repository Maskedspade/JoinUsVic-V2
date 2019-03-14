import React, { Component } from 'react'
import { Sidebar, Segment, Tab, Icon, Button, Responsive } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import LocationDescription from './LocationDescription'
import ThreeContainer from './ThreeContainer'
import MainSelection from './MainSelection'

const DescriptionSidebar = ({ animation, visible, direction, hideDescription, width, panes, handleScreenChange }) => {
  return (
    <Responsive fireOnMount onUpdate={handleScreenChange}>
      <Sidebar
        inverted='true'
        vertical='true'
        animation={animation}
        visible={visible}
        direction={direction}
        width={width}
        className='main-sidebar'
      >
        <div className="sidebar-tab-menu">
          <Tab menu={{
              secondary: true,
              pointing: true
            }}
            panes={panes}
          />
          <Button
            onClick={hideDescription}
            id="sidebar-hidethis">
            <Icon name="caret right" />
            HideThis
          </Button>
        </div>
      </Sidebar>
    </Responsive>
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
      selectedArray: [],
      panes: []
    }

    this.handleLocationSidebar = this.handleLocationSidebar.bind(this)
    this.hideDescription = this.hideDescription.bind(this)
    this.getSelectedAnchorId = this.getSelectedAnchorId.bind(this)
    this.getLocationsOnKeywords = this.getLocationsOnKeywords.bind(this)
    this.handleAnchorClick = this.handleAnchorClick.bind(this)
    this.handleScreenChange = this.handleScreenChange.bind(this)
    this.updateAverageRating = this.updateAverageRating.bind(this)
  }

  // handle user clicking on location/building request, deals with animations
  handleLocationSidebar = () => {
    const { visible, selectedArray, selectedRatingsArray } = this.state
    const { callLoader } = this.props

    this.setState({
      selectorShowed: !this.state.selectorShowed,
      visible: !visible,
      panes: []
    })
    // puts all anchor correlated locations inside of the sidebar tab panes array, sets panes array state
    selectedArray.forEach((location, index) => {
      this.setState(state => {
        const location_info =
        {
          menuItem: {key: location.id, content:location.name},
          render: () =>
            <Tab.Pane attached={false}>
              <LocationDescription
              location={location}
              average_rating={selectedRatingsArray[index]}
              callLoader={callLoader}
              updateAverageRating={this.updateAverageRating}
            />
            </Tab.Pane>
        }
        const panes = [...state.panes, location_info]
        return {
          panes
        }
      })
    })
  }

  // hide sidebar on clicking 'hide this'
  hideDescription = () => {
    this.setState({
      selectorShowed: true,
      visible: false,
    })
  }

  // a callback that grabs responses from post request inside of main-selection component
  getLocationsOnKeywords = (anchors, locations, ratings) => {
    this.setState({
      anchorsIdsStr: anchors,
      locationsArray: locations,
      averageRatingsArray: ratings
    })
  }

  // gets the anchor id on click of 3d model anchor
  getSelectedAnchorId = (anchorId) => {
    const { locationsArray, averageRatingsArray } = this.state

    let selected = []
    let selectedRatings = []
    locationsArray.forEach((location, index) => {
      if (location.anchor_id === Number(anchorId)) {
        selected.push(location)
        selectedRatings.push(averageRatingsArray[index])
      }
    })
    this.setState({
      selectedAnchorId: anchorId,
      selectedArray: selected,
      selectedRatingsArray: selectedRatings
    })
    this.handleAnchorClick()
  }

  handleAnchorClick = () => {
    const { visible, selectedArray, selectedRatingsArray } = this.state

    this.handleLocationSidebar(visible,selectedArray, selectedRatingsArray, this.hideDescription)
  }

  handleScreenChange = (e, {width}) => {
    this.setState({ width })
  }

  updateAverageRating = (newAverageRating, locationId) => {
    console.log(newAverageRating)
    console.log(locationId)
    let locationIdsArray = this.state.selectedArray.map(location => location.id)
    let updatedLocationIndex = locationIdsArray.indexOf(locationId)
    let currentAveRatingsArray = this.state.selectedRatingsArray.splice(updatedLocationIndex, 1, newAverageRating)
    console.log(currentAveRatingsArray)
    this.setState({
      selectedRatingsArray: currentAveRatingsArray
    })
  }

  render() {
    const { selectorShowed, visible, animation, direction, panes, selectedArray, selectedRatingsArray, width } = this.state

    const { keywordsList, modelLoaded, callLoader} = this.props

    const sidebarWidth = width <= Responsive.onlyMobile.minWidth ? 'wide' : 'very wide'

    return (
      <div className="main-wrapper">
        <Sidebar.Pushable as={Segment}>
          <DescriptionSidebar
            animation={animation}
            visible={visible}
            direction={direction}
            selectedArray={selectedArray}
            selectedRatingsArray={selectedRatingsArray}
            hideDescription={this.hideDescription}
            panes={panes}
            width={sidebarWidth}
            handleScreenChange={this.handleScreenChange}
        />
          <Sidebar.Pusher dimmed={visible}>
            <div className="main-model">
              <ThreeContainer
              modelLoaded={modelLoaded}
              getSelectedAnchorId={this.getSelectedAnchorId} />
              { selectorShowed &&
                <MainSelection
                keywordsList={ keywordsList}
                getLocationsOnKeywords={this.getLocationsOnKeywords}
                callLoader={callLoader}/>
              }
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}