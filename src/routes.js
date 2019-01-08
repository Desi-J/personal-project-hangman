import React from 'react';
import {Switch, Route} from 'react-router-dom';
import GamePage from './Components/Pages/GP/GamePage';
import UserDashboard from './Components/Pages/UserDashboard';
import Admin from './Components/Pages/Admin';

export default (
  <Switch>
    <Route exact path="/" component={GamePage} />
    <Route path="/userdashboard" component={UserDashboard} />
    <Route path="/admin" component={Admin} />
  </Switch>
)