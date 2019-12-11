import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from "./components/Login";
import Search from "./components/Search";
import Artist from "./components/Artist";
import AuthService from "./utils/AuthService";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <PrivateRoutes />
        </Route>
      </Switch>
    </Router>
  );
}

const PrivateRoutes = () => {
  let isLoggedIn = AuthService.isLoggedIn();
  return !isLoggedIn ? (
    <Redirect to="/login" />
  ) : (
    <Switch>
      <Route path="/search">
        <Search />
      </Route>
      <Route path="/artist/:name/:id" component={Artist} />
      <Redirect from="/" to="/search" />
    </Switch>
  );
};
