import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthRoute from './routes/AuthRoute';
import DefaultRoute from './routes/DefaultRoute';

library.add(faBars, faSpinner);

const App = () => (
  <Router>
    <Switch>
      <Route path='/dashboard' component={AuthRoute} />
      <Route path='/' component={DefaultRoute} />
    </Switch>
  </Router>
);
export default App;
