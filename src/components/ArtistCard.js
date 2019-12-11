import React from "react";
import { Card, Icon, Image, Rating } from "semantic-ui-react";

const ArtistCard = ({ name, image, followers, popularity }) => (
  <Card centered>
    <Image src={image} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{name}</Card.Header>
      <Card.Meta>
        <span className="date">{followers.toLocaleString()} followers</span>
      </Card.Meta>
    </Card.Content>
    <Card.Content extra>
      <Rating
        rating={Math.round(popularity * 0.05)}
        maxRating={5}
        icon="star"
        disabled
      />
    </Card.Content>
  </Card>
);

export default ArtistCard;
