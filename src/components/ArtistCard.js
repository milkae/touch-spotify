import React from "react";
import { Card, Image, Rating } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const ArtistCard = ({ name, image, followers, popularity, id }) => {
  let history = useHistory();

  return (
    <Card centered onClick={() => history.push(`/artist/${name}/${id}`)}>
      <Image src={image} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>
          <span>{followers.toLocaleString()} followers</span>
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
};

export default ArtistCard;
