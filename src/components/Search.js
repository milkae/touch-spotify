import React, { useState, useEffect } from "react";
import { Input, Grid, Message, Segment, Card } from "semantic-ui-react";
import AuthService from "../utils/AuthService";
import ArtistCard from "./ArtistCard";
import { useHistory } from "react-router-dom";

const fetchArtists = async query => {
  const url = new URL(`${process.env.REACT_APP_SPOTIFY_API}/search`);
  const params = {
    q: query,
    type: "artist"
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

const formatArtist = ({ images, name, followers, popularity, id }) => ({
  name,
  image: images[0] && images[0].url,
  followers: followers.total,
  popularity,
  id
});

const Search = () => {
  const [search, setSearch] = useState(undefined);
  const [artists, setArtists] = useState([]);
  const [status, setStatus] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const stateSearch = history.location.state && history.location.state.search;
    if (search === undefined && stateSearch) {
      setSearch(stateSearch);
      fetchArtists(stateSearch).then(handleResponse);
    } else if (search !== stateSearch) {
      history.replace(history.location.pathname, { search });
    }
  }, [search]);

  const handleSearch = e => {
    if (e.key === "Enter") {
      fetchArtists(search).then(handleResponse);
    } else {
      const value = e.target.value;
      setSearch(value);
      value ? fetchArtists(value).then(handleResponse) : setArtists([]);
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
    <>
      <Grid.Row textAlign="center" centered>
        <Grid.Column style={{ maxWidth: 450 }} textAlign="center">
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
        </Grid.Column>
      </Grid.Row>
      {artists && !!artists.length && (
        <Grid.Row centered>
          <Segment>
            <Card.Group centered>
              {artists.map(artist => (
                <ArtistCard key={`${artist.id}`} {...artist} />
              ))}
            </Card.Group>
          </Segment>
        </Grid.Row>
      )}
    </>
  );
};

export default Search;
