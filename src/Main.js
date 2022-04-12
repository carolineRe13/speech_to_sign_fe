import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Recorder from './pages/Recorder';
import Video from './pages/Video';

const Main = () => {
  return (
    <Switch>
      <Route exact path='/' component={Recorder}></Route>
      <Route exact path='/video' component={Video}></Route>
    </Switch>
  );
}

export default Main;