import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Explore, Home } from './components';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/explore" component={Explore} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
