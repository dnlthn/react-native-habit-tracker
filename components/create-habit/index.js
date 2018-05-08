import React, { Fragment } from 'react';
import { TouchableOpacity, Slider } from 'react-native';

import styled, { css } from 'styled-components';

import { Subscribe } from 'unstated';
import HabitsContainer from '../../containers/habits';
import CreateHabitContainer from '../../containers/create-habit';

import { DAYS } from '../../data/constants';

const CreateHabitForm = ({ open, toggle }) => (
  <CreateHabitContainer>
    {({
      title,
      timesPerDay,
      frequency,
      updateTitle,
      updateTimesPerDay,
      reset,
      toggleDay,
    }) => (
      <Container open={open}>
        <HeadingWrapper open={open}>
          <HeadingText open={open}>Create a Habit</HeadingText>
          {open ? (
            <TouchableOpacity onPress={toggle}>
              <AddIcon
                open={open}
                source={require('../../images/icons/close.png')}
              />
            </TouchableOpacity>
          ) : (
            <AddIcon
              open={open}
              source={require('../../images/icons/plus.png')}
            />
          )}
        </HeadingWrapper>

        {open && (
          <Fragment>
            <Label>WHAT DO YOU WANT TO DO?</Label>
            <Input value={title} onChangeText={updateTitle} />

            <Label>HOW OFTEN EACH DAY?</Label>
            <SliderWrapper>
              <SliderCount>{String(timesPerDay)}</SliderCount>
              <Slider
                minimumTrackTintColor="#feca57"
                maximumTrackTintColor="#f0f1f4"
                style={{ flex: 1 }}
                step={1}
                maximumValue={10}
                value={timesPerDay}
                onValueChange={updateTimesPerDay}
              />
            </SliderWrapper>

            <Label>WHEN?</Label>
            <DaysWrapper>
              {Object.values(DAYS).map(day => (
                <TouchableOpacity key={day} onPress={() => toggleDay(day)}>
                  <DayButton selected={frequency.includes(day)}>
                    <DayText>{day.toUpperCase()}</DayText>
                  </DayButton>
                </TouchableOpacity>
              ))}
            </DaysWrapper>

            <Subscribe to={[HabitsContainer]}>
              {habits => (
                <TouchableOpacity
                  onPress={() => {
                    habits.add({ title, frequency, timesPerDay });
                    reset();
                    toggle();
                  }}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: 15,
                    backgroundColor: '#7a7d9f',
                    borderRadius: 5,
                    paddingVertical: 5,
                  }}
                >
                  <AddText>Create</AddText>
                </TouchableOpacity>
              )}
            </Subscribe>
          </Fragment>
        )}
      </Container>
    )}
  </CreateHabitContainer>
);

export default CreateHabitForm;

const AddText = styled.Text`
  font-size: 16px;
  font-weight: 400;
  margin: 5px;
  color: #f0f1f4;
`;

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

const SliderWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SliderCount = styled.Text`
  font-size: 24px;
  margin-horizontal: 20px;
  color: #20212c;
  font-weight: 200;
`;

const AddIcon = styled.Image`
  height: 30px;
  width: 30px;

  ${props =>
    props.open &&
    css`
      height: 25px;
      width: 25px;
    `};
`;

const Container = styled.View`
  margin-bottom: 5px;
  margin-horizontal: 10px;
  padding-horizontal: 15px;
  padding-vertical: 8px;
  background-color: #4b4e68;
  border-radius: 5px;
  border-left-width: 5;
  border-color: transparent;

  ${props =>
    props.open &&
    css`
      background-color: white;
      border-color: #feca57;
      padding-vertical: 15px;
    `};
`;

const HeadingText = styled.Text`
  color: #36374a;
  flex: 1;
  font-size: ${({ open }) => (open ? '22px' : '18px')};
  font-weight: 300;
`;

const HeadingWrapper = styled.View`
  align-items: center;
  flex-direction: row;

  ${props =>
    props.open &&
    css`
      border-bottom-width: 1px;
      border-color: #d3d4df;
      padding-bottom: 15px;
    `};
`;

const Input = styled.TextInput`
  background-color: #f0f1f4;
  border-radius: 3px;
  color: #0b0b0f;
  padding: 15px;
`;

const Label = styled.Text`
  color: #36374a;
  font-weight: 800;
  letter-spacing: 0.75;
  margin-bottom: 5px;
  margin-top: 20px;
`;
