import React from "react";
import { Card } from "react-bootstrap";
import "./DestinationCard.css";

class DestinationCard extends React.Component {
  render() {
    return (
      <Card
        key={this.props.item.id}
        bg="info"
        text="black"
        onClick={() => {
          this.props.handleCardClick(this.props.item);
        }}
        onMouseEnter={() => {
          this.props.handleMouseEnter(this.props.item);
        }}
      >
        {/* Curtesy of https://www.countryflags.io/ */}
        <Card.Img variant="top" src={"https://www.countryflags.io/" + this.props.item.iso2 + "/flat/64.png"} bsPrefix="card-icon"/>
        <Card.Img variant="top" src={"https://picsum.photos/200/100?" + Math.random()} />
        {/* <Card.Header>City</Card.Header> */}
        <Card.Body>
          <Card.Title>{this.props.item.city}</Card.Title>
          <Card.Text>{this.props.item.country}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default DestinationCard;
