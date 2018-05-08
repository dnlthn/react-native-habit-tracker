import React, { Fragment } from 'react';
import styled from 'styled-components';

import { Subscribe } from 'unstated';
import HabitsContainer from '../../containers/habits';
import CreateHabitContainer from '../../containers/create-habit';

import SubmitButton from './submit';
import DayPicker from './day-picker';
import FrequencySlider from './frequency-slider';

const FormBody = ({ toggle }) => (
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
        <SectionLabel>WHAT DO YOU WANT TO DO?</SectionLabel>
        <UserInput value={title} onChangeText={updateTitle} />

        <SectionLabel>HOW OFTEN EACH DAY?</SectionLabel>
        <FrequencySlider
          timesPerDay={timesPerDay}
          updateTimesPerDay={updateTimesPerDay}
        />

        <SectionLabel>WHEN?</SectionLabel>
        <DayPicker frequency={frequency} toggleDay={toggleDay} />

        <Subscribe to={[HabitsContainer]}>
          {habits => (
            <SubmitButton create={create} habits={habits} toggle={toggle} />
          )}
        </Subscribe>
      </Fragment>
    )}
  </CreateHabitContainer>
);

export default FormBody;

const UserInput = styled.TextInput`
  background-color: #f0f1f4;
  border-radius: 3px;
  color: #0b0b0f;
  padding: 15px;
`;

const SectionLabel = styled.Text`
  color: #36374a;
  font-weight: 800;
  letter-spacing: 0.75;
  margin-bottom: 5px;
  margin-top: 20px;
`;
