import React from 'react';
import { Provider } from 'unstated';

import HabitScreen from './screens/habits';

const App = () => (
  <Provider>
    <HabitScreen />
  </Provider>
);

export default App;
