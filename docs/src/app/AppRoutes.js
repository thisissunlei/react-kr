import React from 'react';
import {
  Route,
  Redirect,
  IndexRoute,
} from 'react-router';

import Master from './components/Master';

import CheckboxPage from './components/pages/components/Checkbox/Page';
import DividerPage from './components/pages/components/Divider/Page';
import HomePage from './components/pages/Home';


const AppRoutes = (
  <Route path="/" component={Master}>
    <IndexRoute component={HomePage} />

    <Route path="components">
      <Route path="checkbox" component={CheckboxPage} />
      <Route path="divider" component={DividerPage} />
    </Route>

  </Route>
);

export default AppRoutes;
