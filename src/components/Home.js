import React from 'react';
import styled from 'styled-components';
import { centeredContainer, largeHeader, subHeader } from 'sharedStyles';

function Home() {
  return (
    <Wrapper>
      <AppTitle>Duckr</AppTitle>
      <AppSummary>
        A realtime, cloud-based, growth hacking, disruptive, modular and scalable social platform.
        <br />
        All the buzzwords venture capitalists like!
        <br />
        Sigh.
      </AppSummary>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${centeredContainer}
`;

const AppTitle = styled.p`
  ${largeHeader}
`;

const AppSummary = styled.p`
  ${subHeader}
  margin: 0 auto;
`;

export default Home;
