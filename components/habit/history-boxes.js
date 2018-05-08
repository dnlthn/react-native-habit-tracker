import React from 'react';
import styled from 'styled-components';

const HistoryBoxes = ({ history }) => (
  <Wrapper>
    {history.map((wasCompleted, index) => (
      <Box key={index} wasCompleted={wasCompleted}>{`${wasCompleted} `}</Box>
    ))}
  </Wrapper>
);

export default HistoryBoxes;

const Wrapper = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
`;

const Box = styled.View`
  height: 15px;
  width: 15px;
  border-radius: 2px;
  background-color: ${({ wasCompleted }) =>
    wasCompleted ? '#51D88A' : '#EF5753'};
  border-color: ${({ wasCompleted }) => (wasCompleted ? '#51D88A' : '#EF5753')};
  margin: 3px;
`;
