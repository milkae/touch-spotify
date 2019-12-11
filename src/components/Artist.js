import React, { useState, useEffect } from "react";
import { Grid, Segment, Card, Header, Dimmer, Loader } from "semantic-ui-react";
import AuthService from "../utils/AuthService";
import AlbumCard from "./AlbumCard";

const Artist = ({ artist: { name, albums }, fetching }) => {
  if (fetching) {
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
        </Grid.Column>
      </Grid>
    );
  }

  return (
    <Grid
      style={{ height: "100vh", padding: "2rem 1rem 1rem" }}
      verticalAlign="middle"
    >
      <Grid.Row>
        <Grid.Column>
          <Header as="h1">{name}</Header>
          <Header as="h2" color="grey">
            Albums
          </Header>
        </Grid.Column>
      </Grid.Row>
      {albums && !!albums.length && (
        <Grid.Row centered>
          <Grid.Column>
            <Segment>
              <Card.Group centered>
                {albums.map(album => (
                  <AlbumCard key={album.id} {...album} />
                ))}
              </Card.Group>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      )}
    </Grid>
  );
};

const fetchArtist = Component => ({ match, ...props }) => {
  const [data, setData] = useState({ artist: {}, isFetching: true });
  useEffect(() => {
    const fetchArtist = async () => {
      try {
        setData({ artist: data.artist, isFetching: true });
        const response = await fetch(
          `${process.env.REACT_APP_SPOTIFY_API}/artists/${match.params.id}/albums`,
          {
            headers: {
              Authorization: `Bearer ${AuthService.getToken()}`
            }
          }
        );
        const result = await response.json();
        const artist = { name: match.params.name, albums: result.items };
        setData({ artist, isFetching: false });
      } catch (e) {
        console.log(e);
        setData({ artist: data.artist, isFetching: false });
      }
    };
    fetchArtist();
  }, []);

  return (
    <Component {...props} artist={data.artist} fetching={data.isFetching} />
  );
};

export default fetchArtist(Artist);
