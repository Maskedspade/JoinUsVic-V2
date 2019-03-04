import React, { Component } from 'react'
import ReactDom from 'react-dom'

import NavBar from '/components/NavBar';

// displays the app view
// components: Canvas(with 3d model and product description on click), NavBar, FunFacts(with form)

class App extends Component {

  render() {
    return (
      <NavBar />
    );
  }
}
export default App