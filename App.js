import React from 'react';

import { TabNavigator } from 'react-navigation';
import HabitScreen from './screens/habits';
import HistoryScreen from './screens/history';

import { Provider } from 'unstated';
// import CounterContainer from './containers/counter'

const TabComponent = TabNavigator({
  Habits: { screen: HabitScreen },
  History: { screen: HistoryScreen }
});

const App = () => (
  <Provider>
    <TabComponent />
  </Provider>
);

export default App;
