import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';

import { DAYS } from '../../data/constants';

const DayPicker = ({ frequency, toggleDay }) => (
  <DaysWrapper>
    {Object.values(DAYS).map(day => (
      <TouchableOpacity key={day} onPress={() => toggleDay(day)}>
        <DayButton selected={frequency.includes(day)}>
          <DayText>{day.toUpperCase()}</DayText>
        </DayButton>
      </TouchableOpacity>
    ))}
  </DaysWrapper>
);

export default DayPicker;

const DaysWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const DayButton = styled.View`
  padding-horizontal: 10px;
  padding-vertical: 10px;
  align-items: center;
  background-color: #f0f1f4;
  margin: 5px;
  border-radius: 5px;
  background-color: ${({ selected }) => (selected ? '#fed780' : '#f0f1f4')};
`;
const DayText = styled.Text`
  color: ${({ selected }) => (selected ? '#37394c' : '#0b0b0f')};
  font-size: 14px;
  letter-spacing: 0.75;
`;
