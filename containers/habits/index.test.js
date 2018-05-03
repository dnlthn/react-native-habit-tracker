import defer from 'tickedoff';

import HabitsContainer from './index';

const generateHabits = numberOfHabits => {
  const baseHabit = {
    frequency: 'DAILY',
    status: 'ACTIVE',
    timesPerDay: 1,
    timesRemainingToday: 1,
    title: 'First Habit!',
  };

  return [...Array(numberOfHabits).keys()].map(index => ({
    ...baseHabit,
    id: index,
  }));
};
it('returns an empty array for the default value', () => {
  const habitsContainer = new HabitsContainer();
  const { habits } = habitsContainer.state;

  expect(habits).toHaveLength(0);
  expect(habits).toEqual([]);
});

it('returns the correct initial value', () => {
  const generatedHabits = generateHabits(2);
  const habitsContainer = new HabitsContainer({ habits: generatedHabits });
  const { habits } = habitsContainer.state;

  expect(habits).toMatchObject(generatedHabits);
});

// it('initial value from prop is set correctly', () => {
//   const counter = new HabitsContainer({
//     initialCount: 3,
//   });
//   expect(counter.state.count).toEqual(3);
// });

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
it('removes the habit when only 1 exists', done => {
  const habitsContainer = new HabitsContainer({ habits: generateHabits(1) });

  habitsContainer.removeHabit(0);
  defer(() => {
    const { habits } = habitsContainer.state;

    expect(habits).toHaveLength(0);
    expect(habits).toEqual([]);
    done();
  });
});
  });
});
