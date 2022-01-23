import PrivateRoute from 'components/PrivateRoute';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthFeature from './features/auth';
import Layout from './components/Layout'

function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/auth" component={AuthFeature} />
        <PrivateRoute path="/" component={Layout} />
      </Switch>
    </div>
  );
}

export default App;
