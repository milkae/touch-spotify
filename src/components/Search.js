import React, { useState } from "react";
import { Input, Grid } from "semantic-ui-react";
import AuthService from "../utils/AuthService";

const fetchArtists = async (query, limit) => {
  const url = new URL(`${process.env.REACT_APP_SPOTIFY_API}/search`);
  const params = {
    q: query,
    type: "artist",
    limit: limit,
    client_id: process.env.REACT_APP_SPOTIFY_ID
  };
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value)
  );

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${AuthService.getToken()}`
    }
  });
  const data = await response.json();
  return data;
};

const Search = () => {
  const [search, setSearch] = useState("");

  const handleSearch = e => {
    if (e.key === "Enter") {
      fetchArtists(search);
    } else {
      const value = e.target.value;
      setSearch(value);
      fetchArtists(value, 10).then(data => console.log(data));
    }
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Input
          onKeyUp={handleSearch}
          icon="search"
          placeholder="Search for an artist..."
        />
      </Grid.Column>
    </Grid>
  );
};

export default Search;
