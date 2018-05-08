import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';

const CounterOrIcon = ({ id, viewAll, perform, timesRemainingToday }) => (
  <Wrapper viewAll={viewAll}>
    {viewAll ? (
      <Icon source={require('../../images/icons/lightning.png')} />
    ) : (
      <TouchableOpacity onPress={() => perform(id)}>
        <Button>
          <Count>{timesRemainingToday}</Count>
        </Button>
      </TouchableOpacity>
    )}
  </Wrapper>
);

export default CounterOrIcon;

const Icon = styled.Image`
  height: 40px;
  width: 40px;
`;

const Wrapper = styled.View`
  padding: 10px;
  width: 75px;
  background-color: ${({ viewAll }) => (viewAll ? 'white' : '#f0f1f4')};
  align-items: center;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  justify-content: center;
`;

const Button = styled.View`
  border-radius: 5px;
  padding: 10px;
  background-color: #fed780;
`;

const Count = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: #20212c;
`;
