import React from 'react';
import {
  Route,
  Redirect,
  IndexRoute,
} from 'react-router';

// Here we define all our new-ui ReactComponents.
import Master from './components/Master';

import CheckboxPage from './components/pages/components/Checkbox/Page';


const AppRoutes = (
  <Route path="/" component={Master}>
    <IndexRoute component={CheckboxPage} />

    <Route path="components">
      <Route path="checkbox" component={CheckboxPage} />
    </Route>

  </Route>
);

export default AppRoutes;
