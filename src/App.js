import React from 'react';
import { Switch, Route } from 'react-router-dom';

//import components
import { Home } from './components';
import { NotFound } from './components';
import { MainLayout } from './components';

function App() {
  return (
    <MainLayout>
      <Switch>
        <Route path="/" exact component={ Home } />
        <Route component={ NotFound } />
      </Switch>
    </MainLayout>
  );
}

export default App;
