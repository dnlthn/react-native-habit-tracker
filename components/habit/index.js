import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components';

import ToggleContainer from '../../containers/toggle';
import Information from './information';

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
                {/*  viewAll, perform, timesRemainingToday */}
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

                {/*  title, streak */}
                <HabitWrapper>
                  <TitleText>{title}</TitleText>
                  <SubtitleText>
                    {streak > 0
                      ? `You are on a streak of ${streak}!`
                      : 'Complete this task to start a streak!'}
                  </SubtitleText>
                </HabitWrapper>
              </Row>

              {on && (
                <Information
                  history={history}
                  frequency={frequency}
                  timesPerDay={timesPerDay}
                  remove={remove}
                  id={id}
                />
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
  color: #979ab4;
  font-weight: 600;
  font-size: 14px;
`;
