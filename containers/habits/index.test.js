import HabitsContainer from './index';

it('returns an empty array for the default value', () => {
  const habitsContainer = new HabitsContainer();
  const { habits } = habitsContainer.state;

  expect(habits).toEqual([]);
  expect(habits).toHaveLength(0);
});

