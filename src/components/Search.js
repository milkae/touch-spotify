import React, { useState } from "react";
import {
  Input,
  Grid,
  Message,
  List,
  Image,
  Segment,
  Container
} from "semantic-ui-react";
import AuthService from "../utils/AuthService";

const fetchArtists = async (query, limit = 20) => {
  const url = new URL(`${process.env.REACT_APP_SPOTIFY_API}/search`);
  const params = {
    q: query,
    type: "artist",
    limit
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

const formatArtist = ({ images, name }, index) => ({
  name,
  image: images[0] && images[0].url
});

const Search = () => {
  const [search, setSearch] = useState("");
  const [artists, setArtists] = useState([]);
  const [status, setStatus] = useState(null);

  const handleSearch = e => {
    if (e.key === "Enter") {
      fetchArtists(search).then(handleResponse);
    } else {
      const value = e.target.value;
      setSearch(value);
      value ? fetchArtists(value, 5).then(handleResponse) : setArtists([]);
    }
  };

  const handleResponse = ({ error, artists }) => {
    setStatus(null);
    setArtists([]);
    if (error) {
      return setStatus({ state: "error", message: error.message });
    }
    if (artists) {
      setArtists(artists.items.map(formatArtist));
    }
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        {status && status.state === "error" && (
          <Message
            error
            header="We're sorry, an error occured"
            content={status.message}
          />
        )}
        <Input
          placeholder="Search for an artist..."
          icon="search"
          onChange={handleSearch}
          value={search}
          size="big"
        />
        {artists && !!artists.length && (
          <Container className="results">
            <Segment>
              <List divided selection verticalAlign="middle">
                {artists.map(({ name, image }, index) => (
                  <List.Item key={`${name}-${index}`}>
                    <Image avatar src={image} />
                    <List.Content>
                      <List.Header>{name}</List.Header>
                    </List.Content>
                  </List.Item>
                ))}
              </List>
            </Segment>
          </Container>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default Search;
