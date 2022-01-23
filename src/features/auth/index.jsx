import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

function SongFeature(props) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.url}/login`} component={LoginPage} />
    </Switch>
  );
}

SongFeature.propTypes = {};

export default SongFeature;
