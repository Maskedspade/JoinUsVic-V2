import React, { Component } from 'react'
import { Container, Divider, Header, Icon } from 'semantic-ui-react'

const FunFactsBlocks = ( {funfacts} ) => {
  return funfacts.map((funfact, i) => {
    return (
      <Container textAlign='justified' className="ff-container">
        <b className="p-highlight">{funfact.user_name} says: </b>
        <p className="p-fade-italic">{funfact.created_at}</p>
        <Divider />
        <p className="p-desktop">{funfact.description}</p>
      </Container>
    );
  })
}

export default class FunFacts extends Component {
  constructor(props) {
    super(props)
    this.convertName = this.convertName.bind(this)
  }

  convertName = ( name ) => {
    return name === '@someone@' ? 'Someone' : name
  }

  // add the "Have funfacts for us?" slider
  render() {
    return(
      <div className="ff-wrapper">
        <Container>
          <a>
            <Icon name="caret right" />
            Have any fun facts for us?
          </a>
        </Container>
        <FunFactsBlocks funfacts={this.props.funfactsList}/>
      </div>
    );
  }
}