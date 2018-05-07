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

  perform = id => {
    if (!this.state[FILTERS.ACTIVE][id]) return;

    const habit = this.state[FILTERS.ACTIVE][id];
    const timesRemainingToday = habit.timesRemainingToday - 1;

    if (timesRemainingToday === 0) {
      const { [String(id)]: _, ...nextActiveState } = this.state[
        FILTERS.ACTIVE
      ];

      const habit_history = this.state[FILTERS.HISTORY][id];
      const nextHistoryState = {
        ...this.state[FILTERS.HISTORY],

        [id]: {
          ...habit_history,
          timesCompleted: habit_history ? habit_history.timesCompleted + 1 : 1,
        },
      };

      this.setState({
        [FILTERS.ACTIVE]: nextActiveState,
        [FILTERS.HISTORY]: nextHistoryState,
      });
    } else {
      const nextState = {
        ...this.state[FILTERS.ACTIVE],

        [id]: {
          ...habit,
          timesRemainingToday,
        },
      };

      this.setState({ [FILTERS.ACTIVE]: nextState });
    }
  };

  getIterable = ({ filter }) => {
    const filterProperties = id => {
      switch (filter) {
        case FILTERS.ACTIVE:
          return {
            timesRemainingToday: this.state[FILTERS.ACTIVE][id]
              .timesRemainingToday,
          };

        case FILTERS.HISTORY:
          return {
            timesCompleted: this.state[FILTERS.HISTORY][id].timesCompleted,
          };

        default:
          return {};
      }
    };

    return Object.keys(this.state[filter]).map(id => ({
      ...this.state.habits[id],
      ...filterProperties(id),
      id,
    }));
  };

  updateActive = () => {
    const nextState = { ...this.state.habits };

    this.setState({ active: nextState });
  };
}

export default HabitsContainer;
