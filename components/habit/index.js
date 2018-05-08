import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components';

import ToggleContainer from '../../containers/toggle';
import Information from './information';
import CounterOrIcon from './counter-icon';

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
                <CounterOrIcon
                  id={id}
                  perform={perform}
                  timesRemainingToday={timesRemainingToday}
                  viewAll={viewAll}
                />

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
                  frequency={frequency}
                  history={history}
                  id={id}
                  remove={remove}
                  timesPerDay={timesPerDay}
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
