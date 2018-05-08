import React from 'react';
import styled from 'styled-components';

import { DAYS } from '../../data/constants';

const DayLister = ({ frequency }) => (
  <Wrapper>
    {Object.values(DAYS)
      .filter(day => frequency.includes(day))
      .map(day => (
        <Button key={day}>
          <Day>{day.toUpperCase()}</Day>
        </Button>
      ))}
  </Wrapper>
);

export default DayLister;

const Button = styled.View`
  align-items: center;
  background-color: #f0f1f4;
  background-color: #fed780;
  border-radius: 5px;
  margin: 5px;
  padding-horizontal: 10px;
  padding-vertical: 10px;
`;

const Day = styled.Text`
  color: #37394c;
  font-size: 14px;
  letter-spacing: 0.75;
`;

const Wrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;
