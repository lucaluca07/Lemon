import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './routes';
const RouterMap: React.SFC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        {routes.map(({ path, component, exact = true }) => (
          <Route
            key={path}
            path={path}
            exact={exact}
            component={lazy(() => import(`../containers/${component}`))}
          />
        ))}
      </Switch>
    </Suspense>
  );
};

export default RouterMap;
