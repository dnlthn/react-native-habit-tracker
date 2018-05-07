import { Container } from 'unstated';
import { STATUS } from './constants';

let _newHabitId = 0;

class HabitsContainer extends Container {
  constructor(props = {}) {
    super(props);

    this.state = {
      habits: props.habits || {},
      [STATUS.ACTIVE]: props[STATUS.ACTIVE] || {},
      [STATUS.HISTORY]: props[STATUS.HISTORY] || {},
    };
  }

  add = ({ title, frequency, timesPerDay }) => {
    const nextHabitState = {
      ...this.state.habits,

      [_newHabitId]: {
        frequency,
        timesPerDay,
        title,
      },
    };

    const nextActiveState = {
      ...this.state[STATUS.ACTIVE],

      [_newHabitId]: {
        timesRemainingToday: timesPerDay,
      },
    };

    _newHabitId = _newHabitId + 1;

    this.setState({
      habits: nextHabitState,
      [STATUS.ACTIVE]: nextActiveState,
    });
  };

  remove = id => {
    const {
      [String(id)]: _removedHabit,
      ...nextHabitState
    } = this.state.habits;

    const { [String(id)]: _removedActive, ...nextActiveState } = this.state[
      STATUS.ACTIVE
    ];

    const { [String(id)]: _removedHistory, ...nextHistoryState } = this.state[
      STATUS.HISTORY
    ];

    this.setState({
      habits: nextHabitState,
      [STATUS.ACTIVE]: nextActiveState,
      [STATUS.HISTORY]: nextHistoryState,
    });
  };

  perform = id => {
    if (!this.state[STATUS.ACTIVE][id]) return;

    const habit = this.state[STATUS.ACTIVE][id];
    const timesRemainingToday = habit.timesRemainingToday - 1;

    if (timesRemainingToday === 0) {
      const { [String(id)]: _removedActive, ...nextActiveState } = this.state[
        STATUS.ACTIVE
      ];

      const habit_history = this.state[STATUS.HISTORY][id];
      const nextHistoryState = {
        ...this.state[STATUS.HISTORY],

        [id]: {
          completed: habit_history
            ? [...habit_history.completed, true]
            : [true],
        },
      };

      this.setState({
        [STATUS.ACTIVE]: nextActiveState,
        [STATUS.HISTORY]: nextHistoryState,
      });
    } else {
      const nextState = {
        ...this.state[STATUS.ACTIVE],

        [id]: {
          ...habit,
          timesRemainingToday,
        },
      };

      this.setState({ [STATUS.ACTIVE]: nextState });
    }
  };

  getHistory = id =>
    this.state.history[id] ? this.state.history[id].completed : [];

  getIterable = ({ filter }) => {
    const filterProperties = id => {
      switch (filter) {
        case STATUS.ACTIVE:
          return {
            timesRemainingToday: this.state[STATUS.ACTIVE][id]
              .timesRemainingToday,
          };

        case STATUS.HISTORY:
          return {
            completed: this.state[STATUS.HISTORY][id].completed,
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
    const nextHistoryState = Object.keys(this.state[STATUS.ACTIVE]).reduce(
      (history, id) => ({
        ...history,
        [id]: {
          completed: history[id] ? [...history[id].completed, false] : [false],
        },
      }),
      this.state.history,
    );

    const nextActiveState = this.getIterable({ filter: 'habits' }).reduce(
      (habits, { id, timesPerDay }) => ({
        ...habits,
        [id]: {
          timesRemainingToday: timesPerDay,
        },
      }),
      {},
    );

    this.setState({ active: nextActiveState, history: nextHistoryState });
  };
}

export default HabitsContainer;
