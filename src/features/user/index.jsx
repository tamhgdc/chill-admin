import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddPage from './pages/AddPage';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';

function UserFeature(props) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={match.url} exact component={ListPage} />
      <Route path={`${match.url}/add`} component={AddPage} />
      <Route path={`${match.url}/:id`} component={DetailPage} />
    </Switch>
  );
}

UserFeature.propTypes = {};

export default UserFeature;