import React, { Fragment } from 'react';
import { TouchableOpacity } from 'react-native';

import styled, { css } from 'styled-components';

import FormBody from './form-body';

const CreateHabitForm = ({ open, toggle }) => (
  <Fragment>
    <FormWrapper open={open}>
      <HeadingWrapper open={open}>
        <HeadingText open={open}>Create a Habit</HeadingText>
        {open ? (
          <TouchableOpacity onPress={toggle}>
            <Icon
              open={open}
              source={require('../../images/icons/close.png')}
            />
          </TouchableOpacity>
        ) : (
          <Icon open={open} source={require('../../images/icons/plus.png')} />
        )}
      </HeadingWrapper>

      {open && <FormBody toggle={toggle} />}
    </FormWrapper>
  </Fragment>
);

export default CreateHabitForm;

const Icon = styled.Image`
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
