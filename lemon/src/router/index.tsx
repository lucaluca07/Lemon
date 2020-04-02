import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './routes';
const RouterMap: React.SFC = () => {
  return (
    <Router>
      <Switch>
        {routes.map(({ path, component }) => (
          <Suspense key={path} fallback={<div>Loading...</div>}>
            <Route path={path} exact={true} component={lazy(() => component)} />
          </Suspense>
        ))}
      </Switch>
    </Router>
  );
};

export default RouterMap;
