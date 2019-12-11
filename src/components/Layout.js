import React from "react";
import { Menu, Grid } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const Layout = ({ children }) => {
  const history = useHistory();
  return (
    <>
      <Menu inverted size="large">
        <Menu.Item
          color="green"
          active
          header
          onClick={() => history.push("/")}
        >
          Spotify Artist Search
        </Menu.Item>
      </Menu>
      <Grid
        style={{ height: "100vh", padding: "2rem 1rem 1rem" }}
        verticalAlign="middle"
      >
        {children}
      </Grid>
    </>
  );
};

export default Layout;
