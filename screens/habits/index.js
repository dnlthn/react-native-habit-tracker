import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Subscribe } from 'unstated';
import styled from 'styled-components';

import HabitsContainer from '../../containers/habits';
import ToggleContainer from '../../containers/toggle';
import ScreenLayout from '../../layouts';
import Habit from '../../components/habit';
import CreateHabitForm from '../../components/create-habit';
import { DAYS } from '../../data/constants';

const Habits = () => (
  <ScrollContainer>
    <ScreenLayout>
      <GreetingWrapper>
        <HeadingText>
          Today is <DayText>{Object.values(DAYS)[new Date().getDay()]}</DayText>
        </HeadingText>
        <SubHeadingText>Here are your tasks for the day!</SubHeadingText>
      </GreetingWrapper>

      <ToggleContainer>
        {({ on, toggle }) =>
          on ? (
            <CreateHabitForm open={on} toggle={toggle} />
          ) : (
            <TouchableOpacity onPress={toggle}>
              <CreateHabitForm open={on} toggle={toggle} />
            </TouchableOpacity>
          )
        }
      </ToggleContainer>

      <Subscribe to={[HabitsContainer]}>
        {habits => (
          <HabitsList updateDay={habits.updateDay}>
            {habits
              .getActiveIterable()
              .map(habit => (
                <Habit
                  key={habit.id}
                  perform={habits.perform}
                  remove={habits.remove}
                  history={habits.getHistory(habit.id)}
                  streak={habits.getStreak(habit.id)}
                  {...habit}
                />
              ))}

            <ToggleContainer>
              {({ on, toggle }) => (
                <React.Fragment>
                  <TouchableOpacity onPress={toggle}>
                    <SectionLabel>{on ? 'CLOSE' : 'VIEW'} ALL</SectionLabel>
                  </TouchableOpacity>
                  {on &&
                    habits
                      .getHabitsIterable()
                      .map(habit => (
                        <Habit
                          key={`history${habit.id}`}
                          {...habit}
                          perform={habits.perform}
                          remove={habits.remove}
                          history={habits.getHistory(habit.id)}
                          streak={habits.getStreak(habit.id)}
                          viewAll
                        />
                      ))}
                </React.Fragment>
              )}
            </ToggleContainer>
          </HabitsList>
        )}
      </Subscribe>
    </ScreenLayout>
  </ScrollContainer>
);

export default Habits;

const HabitsList = styled.View``;

const ScrollContainer = styled.ScrollView`
  background-color: #37394c;
`;

const HeadingText = styled.Text`
  font-weight: 200;
  font-size: 36px;
  color: white;
  margin-bottom: 5px;
`;

const DayText = styled.Text`
  font-weight: 600;
  color: #fec74e;
`;

const SubHeadingText = styled.Text`
  margin-left: 10px;
  font-weight: 600;
  font-size: 18px;
  color: #d3d4df;
`;

const GreetingWrapper = styled.View`
  margin-bottom: 5px;
  margin-top: 20px;
  padding: 20px;
`;

const SectionLabel = styled.Text`
  color: #feca57;
  font-weight: 800;
  letter-spacing: 0.75;
  margin: 20px;
  align-self: center;
`;
