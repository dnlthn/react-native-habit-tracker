import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import { DAYS } from '../../data/constants';

import HistoryBoxes from './history-boxes';
import DayLister from './day-lister';

const Information = ({ id, history, frequency, timesPerDay, remove }) => (
  <View>
    <Wrapper>
      <Label>HISTORY</Label>
      <HistoryBoxes history={history} />

      <Label>DAYS PERFORMED</Label>
      <DayLister frequency={frequency} />

      <Label>
        MUST BE PERFORMED <DarkerText>{timesPerDay}</DarkerText> TIME{timesPerDay >
          1 && 'S'}{' '}
        PER DAY
      </Label>
    </Wrapper>

    <DeleteWrapper onPress={() => remove(id)}>
      <Label>DELETE HABIT</Label>
    </DeleteWrapper>
  </View>
);

export default Information;

const Label = styled.Text`
  color: #b5b7c9;
  font-weight: 800;
  letter-spacing: 0.75;
  margin-bottom: 5px;
  margin-top: 20px;
`;

const Wrapper = styled.View`
  margin-horizontal: 20px;
  margin-vertical: 10px;
`;
const DarkerText = styled.Text`
  color: #20212c;
`;
const DeleteWrapper = styled.TouchableOpacity`
  background-color: #f0f1f4;
  align-items: center;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  padding-bottom: 10px;
`;
