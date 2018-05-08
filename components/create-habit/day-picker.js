import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';

import { DAYS } from '../../data/constants';

const DayPicker = ({ frequency, toggleDay }) => (
  <Wrapper>
    {Object.values(DAYS).map(day => (
      <TouchableOpacity key={day} onPress={() => toggleDay(day)}>
        <Button selected={frequency.includes(day)}>
          <Day>{day.toUpperCase()}</Day>
        </Button>
      </TouchableOpacity>
    ))}
  </Wrapper>
);

export default DayPicker;

const Wrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const Button = styled.View`
  align-items: center;
  background-color: #f0f1f4;
  background-color: ${({ selected }) => (selected ? '#fed780' : '#f0f1f4')};
  border-radius: 5px;
  margin: 5px;
  padding-horizontal: 10px;
  padding-vertical: 10px;
`;
const Day = styled.Text`
  color: ${({ selected }) => (selected ? '#37394c' : '#0b0b0f')};
  font-size: 14px;
  letter-spacing: 0.75;
`;
