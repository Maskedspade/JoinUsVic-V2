import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import LocationDescription from './LocationDescription';

const options = [
  {key: 'tourist', text: 'Toursit Stuff', value: 'tourist'},
  {key: 'kombocha', text: 'Kombocha', value: 'kombocha'},
  {key: 'animals', text: 'Where the animals go...', value: 'animals'}
];


export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
        keywordList: []
    }
  }

  componentDidMount() {
    // ajax call get user keywords input
    axios.get('keywords')
    .then(response => {
        console.log(response.data);
        this.setState({
            keywordList: response.data
        });
    })
    // TODO: create a 404 page component to handle errors instead of console logging
    .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="main-all">
        <div>
            {this.state.keywordList.map( keyword => {
                return(
                    <div key={keyword.id}>
                        <h1>{keyword.name}</h1>
                    </div>
                )
            })}
        </div>
        <LocationDescription />
        <Dropdown
            fluid
            multiple
            selection
            placeholder='What can Victoria offer you today? ...'
            options={options}
            className="main-dropdown"
        />
      </div>
    );
  }
}

