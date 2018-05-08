import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled, { css } from 'styled-components';

import ToggleContainer from '../../containers/toggle';
import { DAYS } from '../../data/constants';

class Habit extends Component {
  render() {
    const {
      history,
      id,
      perform,
      timesPerDay,
      timesRemainingToday,
      title,
      frequency,
      viewAll,
      remove,
      streak,
    } = this.props;

    return (
      <ToggleContainer>
        {({ on, toggle }) => (
          <TouchableOpacity onPress={toggle}>
            <Card>
              <Row open={on}>
                <Left viewAll={viewAll}>
                  {viewAll ? (
                    <Icon
                      source={require('../../images/icons/lightning.png')}
                    />
                  ) : (
                    <TouchableOpacity onPress={() => perform(id)}>
                      <CountButton>
                        <CountText>{timesRemainingToday}</CountText>
                      </CountButton>
                    </TouchableOpacity>
                  )}
                </Left>

                <HabitWrapper>
                  <TitleText>{title}</TitleText>
                  <SubtitleText>
                    {streak > 0
                      ? `You are on a streak of ${streak}!`
                      : 'Complete this task to start a new streak!'}
                  </SubtitleText>
                </HabitWrapper>
              </Row>

              {on && (
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
                      MUST BE PERFORMED{' '}
                      <TimesPerDayText>{timesPerDay}</TimesPerDayText> TIME{timesPerDay >
                        1 && 'S'}{' '}
                      PER DAY
                    </SectionLabel>
                  </OpenWrapper>
                  <DeleteWrapper onPress={() => remove(id)}>
                    <SectionLabel>DELETE HABIT</SectionLabel>
                  </DeleteWrapper>
                </View>
              )}
            </Card>
          </TouchableOpacity>
        )}
      </ToggleContainer>
    );
  }
}

export default Habit;

const Icon = styled.Image`
  height: 40px;
  width: 40px;
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

const Left = styled.View`
  padding: 10px;
  width: 75px;
  background-color: ${({ viewAll }) => (viewAll ? 'white' : '#f0f1f4')};
  align-items: center;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  justify-content: center;
`;

const CountButton = styled.View`
  border-radius: 5px;
  padding: 10px;
  background-color: #fed780;
`;

const CountText = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: #20212c;
`;

const TimesPerDayText = styled.Text`
  color: #20212c;
`;

const Card = styled.View`
  background-color: white;
  border-radius: 5px;
  shadow-radius: 4px;
  shadow-offset: 0 2px;
  shadow-opacity: 0.05;
  margin-bottom: 5px;
  margin-left: 10px;
  margin-right: 10px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;

  ${props =>
    props.open &&
    css`
      border-bottom-width: 2px;
      border-color: #f0f1f4;
    `};
`;

const OpenWrapper = styled.View`
  margin-horizontal: 20px;
  margin-vertical: 10px;
`;

const CheckIcon = styled.Image`
  width: 35;
  height: 35;
`;

const HabitWrapper = styled.View`
  flex: 1;
  padding: 20px;
`;

const TitleText = styled.Text`
  font-size: 20px;
  color: #3d4852;
  padding-bottom: 5px;
  font-weight: 300;
`;

const SubtitleText = styled.Text`
  color: #6574cd;
  font-weight: 800;
  font-size: 14px;
`;

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
