import React, { Component } from 'react';
import {  } from 'semantic-ui-react';

export default class FunFacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
       funfactList: this.props.funfactList
    };
  }

  // add the "Have funfacts for us?" slider
  render() {
    return(
      <div>HELLO</div>
    );
  }
}