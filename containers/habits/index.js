import { Container } from 'unstated';

class HabitsContainer extends Container {
  habitId = 0;
  state = {
    habits: [],
  };

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
}

export default HabitsContainer;
