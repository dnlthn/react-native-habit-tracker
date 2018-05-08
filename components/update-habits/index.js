import React, { Component, Fragment } from 'react';

class UpdateHabits extends Component {
  componentDidUpdate = () => {
    this.props.updateDay();
  };

  render() {
    return <Fragment>{this.props.children}</Fragment>;
  }
}

export default UpdateHabits;
