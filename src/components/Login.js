import React, { useState } from "react";
import { Button, Grid } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import AuthService from "../utils/AuthService";
import { useLocation } from "react-router-dom";
import { Message } from "semantic-ui-react";

const Login = () => {
  const [error, setError] = useState("");
  const location = useLocation();

  if (AuthService.isLoggedIn()) {
    return <Redirect to="/search" />;
  }

  const query = location.hash.substr(1) || location.search.substr(1);
  if (query) {
    const params = new URLSearchParams(query);
    if (params.has("error")) {
      setError(params.get("error"));
      location.search = "";
    } else {
      AuthService.setSession(params);
      return <Redirect to="/search" />;
    }
  }

  const logUser = () => {
    const url = new URL(`${process.env.REACT_APP_SPOTIFY_ACCOUNT}/authorize`);
    const params = {
      client_id: process.env.REACT_APP_SPOTIFY_ID,
      response_type: "token",
      redirect_uri: "http://localhost:3000/login"
    };

    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.append(key, value)
    );
    return url.toString();
  };

  return (
    <Grid.Row centered>
      <Grid.Column textAlign="center" style={{ maxWidth: 450 }}>
        {error && (
          <Message
            error
            header="We're sorry, an error occured"
            content={error}
          />
        )}
        <Button
          href={logUser()}
          as="a"
          content="Login with Spotify"
          icon={{ name: "spotify" }}
          labelPosition="right"
          size="huge"
          color="green"
        />
      </Grid.Column>
    </Grid.Row>
  );
};

export default Login;
