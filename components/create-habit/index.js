import React, { Fragment } from 'react';
import { TouchableOpacity, Slider } from 'react-native';

import styled, { css } from 'styled-components';

import { Subscribe } from 'unstated';
import HabitsContainer from '../../containers/habits';
import CreateHabitContainer from '../../containers/create-habit';

import SubmitButton from './submit';
import DayPicker from './day-picker';
import FrequencySlider from './frequency-slider';

const CreateHabitForm = ({ open, toggle }) => (
  <Fragment>
    <FormWrapper open={open}>
      {/* Input and Header - open, toggle */}
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
        <CreateHabitContainer>
          {({
            title,
            timesPerDay,
            frequency,
            updateTitle,
            updateTimesPerDay,
            toggleDay,
            create,
          }) => (
            <Fragment>
              <Label>WHAT DO YOU WANT TO DO?</Label>
              <Input value={title} onChangeText={updateTitle} />

              <Label>HOW OFTEN EACH DAY?</Label>
              <FrequencySlider
                timesPerDay={timesPerDay}
                updateTimesPerDay={updateTimesPerDay}
              />

              <Label>WHEN?</Label>
              <DayPicker frequency={frequency} toggleDay={toggleDay} />

              <Subscribe to={[HabitsContainer]}>
                {habits => (
                  <SubmitButton
                    create={create}
                    habits={habits}
                    toggle={toggle}
                  />
                )}
              </Subscribe>
            </Fragment>
          )}
        </CreateHabitContainer>
      )}
    </FormWrapper>
  </Fragment>
);

export default CreateHabitForm;

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

const FormWrapper = styled.View`
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
