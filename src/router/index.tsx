import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Tasks from '../containers/tasks';

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

const RouterMap: React.SFC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Tasks} />
      <Route path="/about/" component={About} />
      <Route path="/users/" component={Users} />
    </Switch>
  );
};

export default RouterMap;
