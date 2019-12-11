import React from "react";
import { Card, Image } from "semantic-ui-react";

const AlbumCard = ({
  artists,
  external_urls,
  images,
  name,
  release_date,
  total_tracks
}) => {
  return (
    <Card centered>
      <Image src={images[0].url} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>
          <span>{artists.map(({ name }) => name).join(", ")}</span>
          <p>{release_date}</p>
          <p>{`${total_tracks} track${Number(total_tracks) > 1 ? "s" : ""}`}</p>
        </Card.Meta>
      </Card.Content>
      <Card.Content extra textAlign="center">
        <a href={external_urls.spotify}>Preview on Spotify</a>
      </Card.Content>
    </Card>
  );
};

export default AlbumCard;
