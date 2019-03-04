import React, { Component } from 'react';
import { Dropdown, } from 'semantic-ui-react';

import LocationDescription from './LocationDescription';

// the 'text' within the options below needs to have the @keyword.name
// this jsx will be given all the @keywords to read each name of the array

// const options = [];
// @keywords.forEach((keyword) => {
//   options.push({
//     key: keyword.id,
//     text: keyword.name,
//     value: keyword.name
//   });
// });

// below is just hard coded for testing

    // # @locations_data = {
    // #   id1: {
    // #     name: "Parliament Legislation",
    // #     description: "tourism",
    // #     rating: 5,
    // #     website: 'www.yahoo.com',
    // #     created_at: 2019030111111,
    // #     updated_at: 2019030111111
    // #   },
    // #   id2: {
    // #     name: "Empress Hotel",
    // #     description: "tourism",
    // #     rating: 3,
    // #     website: 'www.lighthouse.ca',
    // #     created_at: 2019030122222,
    // #     updated_at: 2019030122222
    // #   },
    // #   id3: {
    // #     name: "Pet Zoo",
    //      description: "where animals go",
    //      rating: 5,
    //      website: 'www.google.com',
    //      created_at: 2019030133333,
    //      updated_at: 2019030133333
    //    }
    //  }
    //   return(
    //     <div key={props.info.created_at}>
    //       {props.info.name}
    //       {props.info.description}
    //       {props.info.rating}
    //     </div>
    //   );
    // }

const options = [
  {key: 'tourist', text: 'Toursit Stuff', value: 'tourist'},
  {key: 'kombocha', text: 'Kombocha', value: 'kombocha'},
  {key: 'animals', text: 'Where the animals go...', value: 'animals'}
];


export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <LocationDescription />
        <Dropdown />
      </div>
    );
  }
}

