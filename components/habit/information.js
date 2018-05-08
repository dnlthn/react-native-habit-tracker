import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import { DAYS } from '../../data/constants';

const Information = ({ id, history, frequency, timesPerDay, remove }) => (
  <View>
    <OpenWrapper>
      <SectionLabel>HISTORY</SectionLabel>
      <HistoryBoxWrapper>
        {history.map((wasCompleted, index) => (
          <HistoryBox
            key={index}
            wasCompleted={wasCompleted}
          >{`${wasCompleted} `}</HistoryBox>
        ))}
      </HistoryBoxWrapper>

      <SectionLabel>DAYS PERFORMED</SectionLabel>
      <Wrapper>
        {Object.values(DAYS)
          .filter(day => frequency.includes(day))
          .map(day => (
            <Button key={day}>
              <Day>{day.toUpperCase()}</Day>
            </Button>
          ))}
      </Wrapper>

      <SectionLabel>
        MUST BE PERFORMED <TimesPerDayText>{timesPerDay}</TimesPerDayText> TIME{timesPerDay >
          1 && 'S'}{' '}
        PER DAY
      </SectionLabel>
    </OpenWrapper>
    <DeleteWrapper onPress={() => remove(id)}>
      <SectionLabel>DELETE HABIT</SectionLabel>
    </DeleteWrapper>
  </View>
);

export default Information;

const SectionLabel = styled.Text`
  color: #b5b7c9;
  font-weight: 800;
  letter-spacing: 0.75;
  margin-bottom: 5px;
  margin-top: 20px;
`;

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

const OpenWrapper = styled.View`
  margin-horizontal: 20px;
  margin-vertical: 10px;
`;
const TimesPerDayText = styled.Text`
  color: #20212c;
`;
const DeleteWrapper = styled.TouchableOpacity`
  background-color: #f0f1f4;
  align-items: center;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  padding-bottom: 10px;
`;

const HistoryBoxWrapper = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
`;

const HistoryBox = styled.View`
  height: 15px;
  width: 15px;
  border-radius: 2px;
  background-color: ${({ wasCompleted }) =>
    wasCompleted ? '#51D88A' : '#EF5753'};
  border-color: ${({ wasCompleted }) => (wasCompleted ? '#51D88A' : '#EF5753')};
  margin: 3px;
`;
