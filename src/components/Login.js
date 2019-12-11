import React from "react";
import { Button, Grid } from "semantic-ui-react";

const Login = () => {
  const logUser = () => {
    const url = new URL(process.env.REACT_APP_SPOTIFY_ACCOUNT_ENDPOINT);
    const params = {
      client_id: process.env.REACT_APP_SPOTIFY_ID,
      response_type: "token",
      redirect_uri: "http://localhost:3000/search"
    };

    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.append(key, value)
    );
    return url.toString();
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Button
          href={logUser()}
          as="a"
          content="Login with Spotify"
          icon={{ name: "spotify", color: "white" }}
          labelPosition="right"
          size="huge"
          color="green"
        />
      </Grid.Column>
    </Grid>
  );
};

export default Login;
