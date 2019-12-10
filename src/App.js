import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './components/Login'

export default function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
        </Switch>
    </Router>
  );
}

