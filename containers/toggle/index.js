import React, { Fragment, Component } from 'react';

class Toggle extends Component {
  state = { on: false };

  toggle = () => this.setState(({ on }) => ({ on: !on }));

  render() {
    return (
      <Fragment>
        {this.props.children({
          on: this.state.on,
          toggle: this.toggle,
        })}
      </Fragment>
    );
  }
}

export default Toggle;
