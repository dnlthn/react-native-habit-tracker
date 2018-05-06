import defer from 'tickedoff';

import { STATUS } from './constants';
import HabitsContainer from './index';

const generateHabits = numberOfHabits => {
  const baseHabit = {
    frequency: 'DAILY',
    status: STATUS.ACTIVE,
    timesPerDay: 1,
  };

  return [...Array(numberOfHabits).keys()].reduce(
    (habits, key) => ({
      ...habits,
      [key]: {
        ...baseHabit,
        timesRemainingToday: key,
        title: `Habit #${key}`,
      },
    }),
    {},
  );
};

it('returns an empty object for the default value', () => {
  const habitsContainer = new HabitsContainer();
  const { habits } = habitsContainer.state;
  const numberOfHabits = Object.keys(habits).length;

  expect(numberOfHabits).toEqual(0);
  expect(habits).toEqual({});
});

it('returns the correct initial value', () => {
  const generatedHabits = generateHabits(2);
  const habitsContainer = new HabitsContainer({ habits: generatedHabits });
  const { habits } = habitsContainer.state;

  expect(habits).toMatchObject(generatedHabits);
});

it('adds a new habit with the addHabit function when there are not any habits', done => {
  const habitsContainer = new HabitsContainer();
  const newHabit = {
    frequency: 'DAILY',
    timesPerDay: 1,
    title: 'First Habit!',
  };
  habitsContainer.addHabit(newHabit);

  defer(() => {
    const { habits } = habitsContainer.state;
    const numberOfHabits = Object.keys(habits).length;

    expect(numberOfHabits).toEqual(1);
    done();
  });
});

it('adds a new habit with the addHabit function when there is more than 1 habit', done => {
  const habitsContainer = new HabitsContainer();
  const newHabit = {
    frequency: 'DAILY',
    timesPerDay: 1,
    title: 'First Habit!',
  };
  habitsContainer.addHabit(newHabit);

  defer(() => {
    habitsContainer.addHabit(newHabit);
    defer(() => {
      const { habits } = habitsContainer.state;
      const numberOfHabits = Object.keys(habits).length;

      expect(numberOfHabits).toEqual(2);
      done();
    });
  });
});

it('removes the habit when only 1 exists', done => {
  const habitsContainer = new HabitsContainer({ habits: generateHabits(1) });

  habitsContainer.removeHabit(0);
  defer(() => {
    const { habits } = habitsContainer.state;
    const numberOfHabits = Object.keys(habits).length;

    expect(numberOfHabits).toEqual(0);
    expect(habits).toEqual({});
    done();
  });
});

it('remove a habit when there is more than 1', done => {
  const habitsContainer = new HabitsContainer({ habits: generateHabits(3) });

  habitsContainer.removeHabit(1);
  defer(() => {
    const { habits } = habitsContainer.state;
    const numberOfHabits = Object.keys(habits).length;

    expect(numberOfHabits).toEqual(2);
    expect(habits[1]).toBeUndefined();
    done();
  });
});

it('updates the status to completed with the habit no longer needs to be performed today', done => {
  const habitsContainer = new HabitsContainer({ habits: generateHabits(3) });

  const targetHabit = 2;
  habitsContainer.performHabit(targetHabit);
  defer(() => {
    const { habits } = habitsContainer.state;
    const { timesRemainingToday, status } = habits[targetHabit];

    expect(timesRemainingToday).toEqual(1);
    expect(status).toEqual(STATUS.ACTIVE);
    done();
  });
});

it('updates the status to completed with the habit no longer needs to be performed today', done => {
  const habitsContainer = new HabitsContainer({ habits: generateHabits(3) });

  const targetHabit = 1;
  habitsContainer.performHabit(targetHabit);
  defer(() => {
    const { habits } = habitsContainer.state;
    const { status } = habits[targetHabit];

    expect(status).toEqual(STATUS.COMPLETED);
    done();
  });
});
