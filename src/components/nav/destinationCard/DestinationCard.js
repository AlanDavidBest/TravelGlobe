import React from "react";
import { Card } from "react-bootstrap";
import "./DestinationCard.css";

class DestinationCard extends React.Component {
  render() {
    return (
      <Card
        key={this.props.item.id}
        bg="light"
        text="black"
        onMouseEnter={() => {
          this.props.handleCardClick(this.props.item);
        }}
      >
        {/* Curtesy of https://www.countryflags.io/ */}
        <Card.Img variant="top" src={"https://www.countryflags.io/" + this.props.item.iso2 + "/flat/64.png"} bsPrefix="card-icon"/>
        <Card.Img variant="top" src={"https://picsum.photos/200/100?" + Math.random()} />
        <Card.Body>
          <Card.Title>{this.props.item.city}</Card.Title>
          <Card.Text>{this.props.item.country}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default DestinationCard;
