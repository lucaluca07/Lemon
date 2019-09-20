import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Tasks from '../tasks';

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default class Main extends React.Component {

  render() {
    return (
      <div>

        <Router>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
            <li>
              <Link to="/users/">Users</Link>
            </li>
          </ul>
          <Route path="/" exact component={Tasks} />
          <Route path="/about/" component={About} />
          <Route path="/users/" component={Users} />
        </Router>
      </div>

    )
  }
}