import { Container } from 'unstated';

class HabitsContainer extends Container {
  habitId = 0;

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
        id: this.habitId,
        status: 'ACTIVE',
        timesPerDay,
        timesRemainingToday: timesPerDay,
        title,
      },
    ];
    this.habitId = this.habitId + 1;

    this.setState({ habits: nextState });
  };

  removeHabit = id => {
    const nextState = this.state.habits.filter(habit => habit.id !== id);

    this.setState({ habits: nextState });
  };
}

export default HabitsContainer;
