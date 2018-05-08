import React, { Fragment, Component } from 'react';
import { Subscribe } from 'unstated';
import HabitsContainer from '../../containers/habits';

export default class CreateHabit extends Component {
  state = {
    title: '',
    frequency: [],
    timesPerDay: 1,
  };

  updateTitle = text => this.setState({ title: text });

  updateTimesPerDay = value => this.setState({ timesPerDay: value });

  toggleDay = day => {
    const nextFrequency = state =>
      state.includes(day)
        ? [
            ...state.slice(0, state.indexOf(day)),
            state[state.indexOf(day)] + 1,
            ...state.slice(state.indexOf(day) + 1),
          ]
        : [...state, day];

    this.setState(state => ({ frequency: nextFrequency(state.frequency) }));
  };

  reset = () => {
    this.setState({
      title: '',
      frequency: [],
      timesPerDay: 1,
    });
  };

  create = callback => {
    callback(this.state);
    this.reset();
  };

  render() {
    return (
      <Fragment>
        {this.props.children({
          addHabit: this.addHabit,
          create: this.create,
          frequency: this.state.frequency,
          reset: this.reset,
          timesPerDay: this.state.timesPerDay,
          title: this.state.title,
          toggleDay: this.toggleDay,
          updateTimesPerDay: this.updateTimesPerDay,
          updateTitle: this.updateTitle,
        })}
      </Fragment>
    );
  }
}
