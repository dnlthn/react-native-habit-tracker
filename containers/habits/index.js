import { Container } from 'unstated';

let _newHabitId = 0;

class HabitsContainer extends Container {
  constructor(props = {}) {
    super(props);

    this.state = {
      habits: props.habits || {},
      active: props.active || {},
      history: props.history || {},
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
      ...this.state.active,

      [_newHabitId]: {
        timesRemainingToday: timesPerDay,
      },
    };

    _newHabitId = _newHabitId + 1;

    this.setState({
      habits: nextHabitState,
      active: nextActiveState,
    });
  };

  remove = id => {
    const {
      [String(id)]: _removedHabit,
      ...nextHabitState
    } = this.state.habits;

    const {
      [String(id)]: _removedActive,
      ...nextActiveState
    } = this.state.active;

    const {
      [String(id)]: _removedHistory,
      ...nextHistoryState
    } = this.state.history;

    this.setState({
      habits: nextHabitState,
      active: nextActiveState,
      history: nextHistoryState,
    });
  };

  perform = id => {
    if (!this.state.active[id]) return;

    const habit = this.state.active[id];
    const timesRemainingToday = habit.timesRemainingToday - 1;

    if (timesRemainingToday > 0) {
      const nextState = {
        ...this.state.active,

        [id]: {
          ...habit,
          timesRemainingToday,
        },
      };

      this.setState({ active: nextState });
    } else {
      const {
        [String(id)]: _removedActive,
        ...nextActiveState
      } = this.state.active;

      const habit_history = this.state.history[id];
      const nextHistoryState = {
        ...this.state.history,

        [id]: {
          completed: habit_history
            ? [...habit_history.completed, true]
            : [true],
        },
      };

      this.setState({
        active: nextActiveState,
        history: nextHistoryState,
      });
    }
  };

  getHistory = id =>
    this.state.history[id] ? this.state.history[id].completed : [];

  getIterable = ({ filter }) => {
    const filterProperties = id => {
      switch (filter) {
        case 'active':
          return {
            timesRemainingToday: this.state.active[id].timesRemainingToday,
          };

        case 'history':
          return {
            completed: this.state.history[id].completed,
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
    const nextHistoryState = Object.keys(this.state.active).reduce(
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
