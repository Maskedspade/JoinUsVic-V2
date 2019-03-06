import React, { Component } from 'react';
import { Dropdown, Sidebar, Segment, Button, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import LocationDescription from './LocationDescription';
import ThreeContainer from './ThreeContainer';
import axios from 'axios';

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
    super(props);
    this.state = {
        keywordsList: [],
        keywordsSelected: [],
        locationsList: [],
        locationSelected: null,
        selectorShowed: true,
        visible: false,
        animation: 'overlay',
        direction: 'right'
    };
    this.handlePush = this.handlePush.bind(this)
    this.getSelectedKeywords = this.getSelectedKeywords.bind(this)
  }

  // get keywords and locations from database
  // sets corresponding states when fetched
  componentDidMount() {
    axios.all([
      axios.get('keywords'),
      axios.get('locations')
    ])
    .then(axios.spread((keywordsRes, locationsRes) => {
      this.setState({
          keywordsList: keywordsRes.data,
          locationsList: locationsRes.data,
          locationSelected: locationsRes.data[4]
      });
    }))
    .catch(error => console.log(error));
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

  // handles user's keyword selection
  getSelectedKeywords = (e, {value}) => {
    console.log(value);
    let keyword_name = e.target.textContent;
    console.log(keyword_name);
  }

  render() {
    const { keywordsList, locationsList, locationSelected, visible, animation, direction } = this.state

    const options = keywordsList.map( keyword => {
        return {
            key:keyword.id,
            text:keyword.name,
            value:keyword.id
        }
    });

    return (
      <div className="main-wrapper">
        <Sidebar.Pushable as={Segment}>
          <DescriptionSidebar animation={animation} visible={visible} direction={direction} locationSelected={this.state.locationSelected}/>
          <Sidebar.Pusher>
            <div className="main-model">
              <ThreeContainer />
              {this.state.selectorShowed &&
                <Dropdown
                  fluid
                  multiple
                  selection
                  placeholder='What can Victoria offer you today? ...'
                  options={options}
                  onChange={this.getSelectedKeywords}
                  className="main-dropdown"
                /> }
              <Button className="btn-building" onClick={this.handlePush('overlay', 'right')}>Show</Button>
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>


      </div>
    );
  }
}