import defer from 'tickedoff';

import { DAYS } from './constants';
import HabitsContainer from './index';

const generateHabits = numberOfHabits => {
  const baseHabit = {
    frequency: [DAYS.MONDAY, DAYS.FRIDAY],
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

it('adds a new habit with the add function when there are not any habits', done => {
  const habitsContainer = new HabitsContainer();
  const newHabit = {
    frequency: 'DAILY',
    timesPerDay: 1,
    title: 'First Habit!',
  };
  habitsContainer.add(newHabit);

  defer(() => {
    const { habits } = habitsContainer.state;
    const numberOfHabits = Object.keys(habits).length;

    expect(numberOfHabits).toEqual(1);
    done();
  });
});

it('adds a new habit with the add function when there is more than 1 habit', done => {
  const habitsContainer = new HabitsContainer();
  const newHabit = {
    frequency: 'DAILY',
    timesPerDay: 1,
    title: 'First Habit!',
  };
  habitsContainer.add(newHabit);

  defer(() => {
    habitsContainer.add(newHabit);
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

  habitsContainer.remove(0);
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

  habitsContainer.remove(1);
  defer(() => {
    const { habits } = habitsContainer.state;
    const numberOfHabits = Object.keys(habits).length;

    expect(numberOfHabits).toEqual(2);
    expect(habits[1]).toBeUndefined();
    done();
  });
});

it('removes the habit from the active state and moves it to the history state when there are no more performances required today', done => {
  const generatedHabits = generateHabits(3);
  const habitsContainer = new HabitsContainer({
    habits: generatedHabits,
    active: generatedHabits,
  });

  const targetHabit = 1;
  habitsContainer.perform(targetHabit);
  defer(() => {
    const { active, history } = habitsContainer.state;

    expect(active[targetHabit]).toBeFalsy();
    expect(history[targetHabit]).toBeTruthy();
    done();
  });
});

it('keeps the habit in the active state when it is performed but still has at least 1 more required performance', done => {
  const generatedHabits = generateHabits(3);
  const habitsContainer = new HabitsContainer({
    habits: generatedHabits,
    active: generatedHabits,
  });

  const targetHabit = 2;
  habitsContainer.perform(targetHabit);
  defer(() => {
    const { active } = habitsContainer.state;
    const { timesRemainingToday } = active[targetHabit];

    expect(active[targetHabit]).toBeTruthy();
    expect(timesRemainingToday).toEqual(1);
    done();
  });
});

it('when moving a habit to history for the first time, it sets the first completion to true', done => {
  const generatedHabits = generateHabits(3);
  const habitsContainer = new HabitsContainer({
    habits: generatedHabits,
    active: generatedHabits,
  });

  const targetHabit = 1;
  habitsContainer.perform(targetHabit);
  defer(() => {
    const { history } = habitsContainer.state;
    const { completed } = history[targetHabit];

    expect(completed).toHaveLength(1);
    expect(completed[0]).toBeTruthy();
    done();
  });
});

it('when moving a habit to history that already exists, it sets the next completion to true', done => {
  const generatedHabits = generateHabits(3);
  const habitsContainer = new HabitsContainer({
    habits: generatedHabits,
    active: generatedHabits,
    history: {
      '1': {
        completed: [true],
      },
    },
  });

  const targetHabit = 1;
  habitsContainer.perform(targetHabit);
  defer(() => {
    const { history } = habitsContainer.state;
    const { completed } = history[targetHabit];

    expect(completed).toHaveLength(2);
    expect(completed[0]).toBeTruthy();
    expect(completed[1]).toBeTruthy();
    done();
  });
});

it('returns the correct history when searched for with an id', () => {
  const habitsContainer = new HabitsContainer({
    history: {
      '1': {
        completed: [true, true],
      },
    },
  });

  const targetHabit = 1;
  const history = habitsContainer.getHistory(targetHabit);

  expect(history).toEqual([true, true]);
});

it('returns the correct array containing all the active habits', () => {
  const generatedHabits = generateHabits(3);
  const habitsContainer = new HabitsContainer({
    habits: generatedHabits,
    active: {
      '1': {
        timesRemainingToday: 1,
      },
      '2': {
        timesRemainingToday: 2,
      },
    },
    history: {
      '0': {
        completed: [true],
      },
    },
  });

  const iterable = habitsContainer.getActiveIterable();

  expect(iterable).toHaveLength(2);
  expect(iterable).toEqual([
    {
      frequency: ['monday', 'friday'],
      timesPerDay: 1,
      timesRemainingToday: 1,
      title: 'Habit #1',
      completed: [],
      id: '1',
    },
    {
      frequency: ['monday', 'friday'],
      timesPerDay: 1,
      timesRemainingToday: 2,
      title: 'Habit #2',
      completed: [],
      id: '2',
    },
  ]);
});

it('returns the correct array containing all the habits', () => {
  const generatedHabits = generateHabits(3);
  const habitsContainer = new HabitsContainer({
    habits: generatedHabits,
    active: {
      '1': {
        timesRemainingToday: 1,
      },
      '2': {
        timesRemainingToday: 2,
      },
    },
    history: {
      '0': {
        completed: [true],
      },
    },
  });

  const iterable = habitsContainer.getHabitsIterable();

  expect(iterable).toHaveLength(3);
  expect(iterable).toEqual([
    {
      frequency: ['monday', 'friday'],
      timesPerDay: 1,
      timesRemainingToday: 0,
      title: 'Habit #0',
      completed: [true],
      id: '0',
    },
    {
      frequency: ['monday', 'friday'],
      timesPerDay: 1,
      timesRemainingToday: 1,
      title: 'Habit #1',
      completed: [],
      id: '1',
    },
    {
      frequency: ['monday', 'friday'],
      timesPerDay: 1,
      timesRemainingToday: 2,
      title: 'Habit #2',
      completed: [],
      id: '2',
    },
  ]);
});

it('adds a false to the ids completed list when unfinished during an update and the habit does not have any previous history', () => {
  const generatedHabits = generateHabits(3);
  const habitsContainer = new HabitsContainer({
    habits: generatedHabits,
    active: {
      '1': {
        timesRemainingToday: 1,
      },
    },
  });

  habitsContainer.updateActive();
  defer(() => {
    const { '1': habit } = habitsContainer.state.history;

    expect(habit.completed).toEqual([false]);
  });
});

it('adds a false to the ids completed list when unfinished during an update and habit does have previous history', () => {
  const generatedHabits = generateHabits(3);
  const habitsContainer = new HabitsContainer({
    habits: generatedHabits,
    active: {
      '1': {
        timesRemainingToday: 1,
      },
    },
    history: {
      '1': {
        completed: [true],
      },
    },
  });

  habitsContainer.updateActive();
  defer(() => {
    const { '1': habit } = habitsContainer.state.history;

    expect(habit.completed).toHaveLength(2);
    expect(habit.completed).toEqual([true, false]);
  });
});

it('resets the active habits to the new days habits', () => {
  const generatedHabits = generateHabits(2);
  const habitsContainer = new HabitsContainer({
    habits: generatedHabits,
  });

  habitsContainer.updateActive();
  defer(() => {
    const { active } = habitsContainer.state;
    expect(active).toEqual({
      '0': { timesRemainingToday: 1 },
      '1': { timesRemainingToday: 1 },
    });
  });
});
