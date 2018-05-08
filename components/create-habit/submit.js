import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';

const SubmitButton = ({ create, habits, toggle }) => (
  <TouchableOpacity
    onPress={() => {
      create(habits.add);
      toggle();
    }}
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 15,
      backgroundColor: '#7a7d9f',
      borderRadius: 5,
      paddingVertical: 5,
    }}
  >
    <AddText>Create</AddText>
  </TouchableOpacity>
);

export default SubmitButton;

const AddText = styled.Text`
  font-size: 16px;
  font-weight: 400;
  margin: 5px;
  color: #f0f1f4;
`;
