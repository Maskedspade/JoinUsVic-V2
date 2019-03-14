import React, { Component } from 'react'
import { Item, Icon, Rating } from 'semantic-ui-react'
import axios from 'axios'

const DescriptionCard = ( {location, average_rating, handleRatingSubmit } ) => {
  return (
    <Item className="ld-wrapper">
      <Item.Header as='h2'>{location.name}</Item.Header>
      {location.website && <Item.Header as='a' href={location.website} target='_blank'>Website
        <Icon name='angle double right' />
      </Item.Header>}

      <Item.Meta className="p-fade-italic
      ">
        {location.address}
      </Item.Meta>

      <Item.Extra className="p-highlight">
        Rating: &nbsp;&nbsp;
        <Rating
          icon='star'
          defaultRating={average_rating}
          maxRating={5}
          size='large'
          disabled
        />
        {average_rating}
      </Item.Extra>
      <Item.Description className="p-desktop">
        {location.description}
      </Item.Description>

      <Item.Header as='h4' className="p-highlight centered">
        Rate this location:&nbsp;&nbsp;
        <Rating
          icon='star'
          defaultRating={0}
          maxRating={5}
          size='huge'
          onRate={handleRatingSubmit}
        >
        </Rating>
      </Item.Header>
    </Item>
  )
}

export default class LocationDescription extends Component {
  constructor(props) {
    super(props)
    this.handleRatingSubmit = this.handleRatingSubmit.bind(this)
  }

  handleRatingSubmit = (e, {rating}) => {
    let successNode = document.getElementById("ld-success-message")
    if(successNode)
      successNode.remove()
    this.props.callLoader()

    axios.post('api/ratings/', {
      rating: { score: rating, location_id: this.props.location.id }
    })
    .then(res => {
      this.props.updateAverageRating(res.data.new_ave, this.props.location.id)
      this.props.callLoader()
      const msgDiv = document.createElement("p")
      msgDiv.setAttribute("id", "ld-success-message")
      const successMsg = document.createTextNode("Thank you for your contribution!")
      document.getElementsByClassName("ld-wrapper")[0].appendChild(msgDiv)
    })
    .catch(error => console.log(error))
  }

  render() {
    const { location, average_rating } = this.props

    return (
      <DescriptionCard location={location} average_rating={average_rating} handleRatingSubmit={this.handleRatingSubmit}/>
    )
  }
}