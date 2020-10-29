import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard/index';
import Repository from '../pages/Repository/index';
import GlobalStyle from '../styles/global';

const Routes: React.FC = () => (
  <>
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/Repository/:repository+" exact component={Repository} />
    </Switch>
    <GlobalStyle />
  </>
);

export default Routes;
