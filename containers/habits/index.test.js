import HabitsContainer from './index';

it('returns an empty array for the default value', () => {
  const habitsContainer = new HabitsContainer();
  const { habits } = habitsContainer.state;

  expect(habits).toHaveLength(0);
  expect(habits).toEqual([]);
});

