import React from 'react';
import { View } from 'react-native';

const ScreenLayout = ({ children }) => (
  <View
    style={{
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      paddingTop: 40
    }}
  >
    {children}
  </View>
);

export default ScreenLayout;
