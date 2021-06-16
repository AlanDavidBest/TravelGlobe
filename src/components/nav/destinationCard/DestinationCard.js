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
        onClick={() => {
          this.props.handleCardClick(this.props.item);
        }}
      >
        {/* Courtesy of https://www.countryflags.io/ */}
        <Card.Img variant="top" src={"https://www.countryflags.io/" + this.props.item.iso2 + "/flat/64.png"} bsPrefix="card-icon"/>
        <Card.Img variant="top" src={`https://source.unsplash.com/1600x900/?${this.props.item.city}`} />
        <Card.Body>
          <Card.Title>{this.props.item.city}</Card.Title>
          <Card.Text>{this.props.item.country}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default DestinationCard;
