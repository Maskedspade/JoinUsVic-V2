import React from 'react'
import ReactDOM from 'react-dom';

import NavBar from './components/NavBar';
import Main from './components/Main';
import FunFacts from './components/FunFacts';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      funfact_page: false,
    };
  }

  render() {
    const keywords_info = this.props.keywords_info;
    const funfacts_info = this.props.funfacts_info;
    const locations_info = this.props.locations_info;

    return (
      <div className="app">
        <NavBar />
        <Main />
        <FunFacts funfacts_sub={funfacts_info}/>
      </div>
    );
  }
}

export default App

// <Main locations_sub={locations_info} funfacts_sub={funfacts_info}/>


// displays the app view
// components: Canvas(with 3d model and product description on click), NavBar, FunFacts(with form)
