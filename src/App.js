import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { injectGlobal } from 'styled-components';
import routeProtection from 'helpers/routeProtection';
import { MainContainer, AuthenticateContainer, HomeContainer, FeedContainer,
  LogoutContainer, UserContainer, DuckDetailsContainer } from 'containers';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
`;

function App() {
  return (
    <BrowserRouter>
      <MainContainer>
        <Switch>
          <Route exact path='/' component={routeProtection(HomeContainer)} />
          <Route path='/auth' component={routeProtection(AuthenticateContainer)} />
          <Route path='/feed' component={routeProtection(FeedContainer)} />
          <Route path='/logout' component={LogoutContainer} />
          <Route path='/duckDetail/:duckId' component={routeProtection(DuckDetailsContainer)} />
          <Route path='/:uid' component={routeProtection(UserContainer)} />
          <Route render={() => <p>Page Not Found!</p>} />
        </Switch>
      </MainContainer>
    </BrowserRouter>
  );
}

export default App;
