/* eslint-disable */

import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';

class RestaurantView extends Component {
  constructor() {
    super();

    this.state = {
      value: ''
    };

    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }

  inputChangeHandler(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div>
        <Card>
            <Card.Content>
                <Card.Header>
                    Panda Express
                </Card.Header>
                <Card.Meta>
                    Address: 110 W. Green St.

                    Hours: 10AM-9PM MTWF

                    Contact: Debby Parker 217-343-0909
                </Card.Meta>
            </Card.Content>
        </Card>
      </div>
    );
  }
}
export default RestaurantView;
