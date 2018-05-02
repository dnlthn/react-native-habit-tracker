import { TabNavigator } from 'react-navigation';

import HabitScreen from './screens/habits';
import HistoryScreen from './screens/history';

export default TabNavigator({
  Habits: { screen: HabitScreen },
  History: { screen: HistoryScreen }
});
