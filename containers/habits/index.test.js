import defer from 'tickedoff';

import HabitsContainer from './index';

it('returns an empty array for the default value', () => {
  const habitsContainer = new HabitsContainer();
  const { habits } = habitsContainer.state;

  expect(habits).toHaveLength(0);
  expect(habits).toEqual([]);
});

it('adds a new habit with the addHabit function', done => {
  const habitsContainer = new HabitsContainer();
  const newHabit = {
    frequency: 'DAILY',
    timesPerDay: 1,
    title: 'First Habit!',
  };
  habitsContainer.addHabit(newHabit);

  defer(() => {
    const { habits } = habitsContainer.state;

    expect(habits).toHaveLength(1);
    done();
  });
});
