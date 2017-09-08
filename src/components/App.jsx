/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import styled from 'styled-components';
import Cities from './Cities';
import Weather from './Weather';

const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: 250px minmax(700px, 1fr);
  grid-template-rows: minmax(100vh, auto);
  color: #e5f4e3;
  font-family: 'Oswald', sans-serif;
`;

class App extends Component {
  render() {
    return (
      <PageWrapper>
        <Cities />
        <Weather />
      </PageWrapper>
    );
  }
}

export default App;
