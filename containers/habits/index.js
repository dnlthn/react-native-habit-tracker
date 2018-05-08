import { Container } from 'unstated';

import { DAYS } from '../../data/constants';

const _iterableFromIds = (ids, state) =>
  Object.keys(ids).map(id => {
    const timesRemainingToday = state.active[id]
      ? state.active[id].timesRemainingToday
      : 0;
    const completed = state.history[id] ? state.history[id].completed : [];

    return {
      ...state.habits[id],
      completed,
      id,
      timesRemainingToday,
    };
  });

class HabitsContainer extends Container {
  constructor(props = {}) {
    super(props);

    this.state = {
      habits: props.habits || {},
      active: props.active || {},
      history: props.history || {},
      newHabitId: props.newHabitId || 0,
      currentDay: Object.values(DAYS)[new Date().getDay()],
    };
  }

  add = ({ title, frequency, timesPerDay }) => {
    const nextHabitState = state => ({
      ...state.habits,

      [state.newHabitId]: {
        frequency,
        timesPerDay,
        title,
      },
    });

    const nextActiveState = state => {
      const today = Object.values(DAYS)[new Date().getDay()];

      return frequency.includes(today)
        ? {
            ...state.active,

            [state.newHabitId]: {
              timesRemainingToday: timesPerDay,
            },
          }
        : state.active;
    };

    this.setState(state => ({
      habits: nextHabitState(state),
      active: nextActiveState(state),
      newHabitId: state.newHabitId + 1,
    }));
  };

  remove = id => {
    const stateAfterRemoval = state => {
      const { [String(id)]: _removed, ...nextState } = state;
      return nextState;
    };

    this.setState(state => ({
      habits: stateAfterRemoval(state.habits),
      active: stateAfterRemoval(state.active),
      history: stateAfterRemoval(state.history),
    }));
  };

  perform = id => {
    const isCompleted = state => state[id].timesRemainingToday - 1 === 0;

    const nextActiveState = state => {
      const habit = state[id];
      const timesRemainingToday = habit.timesRemainingToday - 1;

      if (timesRemainingToday > 0) {
        return {
          ...state,

          [id]: {
            ...habit,
            timesRemainingToday,
          },
        };
      } else {
        const { [String(id)]: _removed, ...nextState } = state;

        return nextState;
      }
    };

    const nextHistoryState = state => ({
      ...state,

      [id]: {
        completed: state[id] ? [...state[id].completed, true] : [true],
      },
    });

    this.setState(state => ({
      active: nextActiveState(state.active),
      history: isCompleted(state.active)
        ? nextHistoryState(state.history)
        : state.history,
    }));
  };

  getHistory = id =>
    this.state.history[id] ? this.state.history[id].completed : [];

  getActiveIterable = () => _iterableFromIds(this.state.active, this.state);
  getHabitsIterable = () => _iterableFromIds(this.state.habits, this.state);
  getHistoryIterable = () => _iterableFromIds(this.state.history, this.state);
  getStreak = id => {
    if (!this.state.history[id]) return 0;

    const streak = [...this.state.history[id].completed]
      .reverse()
      .indexOf(false);
    const streakLength =
      streak >= 0 ? streak : this.state.history[id].completed.length;

    return streakLength;
  };

  updateActive = () => {
    const nextHistoryState = state =>
      Object.keys(state.active).reduce(
        (history, id) => ({
          ...history,
          [id]: {
            completed: history[id]
              ? [...history[id].completed, false]
              : [false],
          },
        }),
        state.history,
      );

    const nextActiveState = () =>
      this.getHabitsIterable().reduce(
        (habits, { id, timesPerDay, frequency }) => {
          const today = Object.values(DAYS)[new Date().getDay()];

          return frequency.includes(today)
            ? {
                ...habits,
                [id]: {
                  timesRemainingToday: timesPerDay,
                },
              }
            : habits;
        },
        {},
      );

    this.setState(state => ({
      active: nextActiveState(),
      history: nextHistoryState(state),
    }));
  };

  updateDay = () => {
    const today = Object.values(DAYS)[new Date().getDay()];

    if (this.state.currentDay !== today) {
      this.setState({
        currentDay: today,
      });
      this.updateActive();
    }
  };
}

export default HabitsContainer;
