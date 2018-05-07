import { Container } from 'unstated';
import { FILTERS, STATUS } from './constants';

let _newHabitId = 0;

class HabitsContainer extends Container {
  constructor(props = {}) {
    super(props);

    this.state = {
      habits: props.habits || {},
      [FILTERS.ACTIVE]: props[FILTERS.ACTIVE] || {},
      [FILTERS.HISTORY]: props[FILTERS.HISTORY] || {},
    };
  }

  add = ({ title, frequency, timesPerDay }) => {
    const nextState = {
      ...this.state.habits,

      [_newHabitId]: {
        frequency,
        timesPerDay,
        title,
      },
    };

    const nextActiveState = {
      ...this.state[FILTERS.ACTIVE],

      [_newHabitId]: {
        timesRemainingToday: timesPerDay,
      },
    };

    _newHabitId = _newHabitId + 1;

    this.setState({
      habits: nextState,
      [FILTERS.ACTIVE]: nextActiveState,
    });
  };

  remove = id => {
    const { [String(id)]: _, ...nextState } = this.state.habits;

    this.setState({ habits: nextState });
  };

    const habit = this.state.habits[id];
  perform = id => {
    const timesRemainingToday = habit.timesRemainingToday - 1;

    const nextState = {
      ...this.state.habits,

      [id]: {
        ...habit,
        timesRemainingToday,
        status: timesRemainingToday === 0 ? STATUS.COMPLETED : habit.status,
      },
    };

    this.setState({ habits: nextState });
  };
}

export default HabitsContainer;
