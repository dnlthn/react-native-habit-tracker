import React from 'react';

import styled from 'styled-components';

const ScreenLayout = ({ children }) => (
  <ScreenContainer>{children}</ScreenContainer>
);

export default ScreenLayout;

const ScreenContainer = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  padding-top: 40;
  align-items: stretch;
  background-color: #37394c;
`;
