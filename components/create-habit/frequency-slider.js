import React from 'react';
import { Slider } from 'react-native';
import styled from 'styled-components';

const FrequencySlider = ({ timesPerDay, updateTimesPerDay }) => (
  <Wrapper>
    <Counter>{String(timesPerDay)}</Counter>
    <Slider
      minimumTrackTintColor="#feca57"
      maximumTrackTintColor="#f0f1f4"
      style={{ flex: 1 }}
      step={1}
      maximumValue={10}
      value={timesPerDay}
      onValueChange={updateTimesPerDay}
    />
  </Wrapper>
);

export default FrequencySlider;

const Wrapper = styled.View`
  align-items: center;
  flex-direction: row;
`;

const Counter = styled.Text`
  color: #20212c;
  font-size: 24px;
  font-weight: 200;
  margin-horizontal: 20px;
`;
