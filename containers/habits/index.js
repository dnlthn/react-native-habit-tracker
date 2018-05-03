import { Container } from 'unstated';

let habitId = 0;
const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  COMPLETED: 'completed',
};

class HabitsContainer extends Container {
  constructor(props = {}) {
    super(props);

    this.state = {
      habits: props.habits || [],
    };
  }

  state = {};

  addHabit = ({ title, frequency, timesPerDay }) => {
    const nextState = [
      ...this.state.habits,
      {
        frequency,
        id: habitId,
        status: STATUS.ACTIVE,
        timesPerDay,
        timesRemainingToday: timesPerDay,
        title,
      },
    ];
    habitId = habitId + 1;

    this.setState({ habits: nextState });
  };

  removeHabit = id => {
    const nextState = this.state.habits.filter(habit => habit.id !== id);

    this.setState({ habits: nextState });
  };

  performHabit = id => {
    const nextState = this.state.habits.map(habit => {
      if (habit.id === id) {
        const timesRemainingToday = habit.timesRemainingToday - 1;

        return {
          ...habit,
          timesRemainingToday,
          status: timesRemainingToday === 0 ? STATUS.COMPLETED : habit.status,
        };
      } else {
        return habit;
      }
    });

    this.setState({ habits: nextState });
  };
}

export default HabitsContainer;
