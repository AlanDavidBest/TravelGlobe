import React from "react";
import { Card } from "react-bootstrap";
import "./DestinationCard.css";

class DestinationCard extends React.Component {
  render() {
    return (
      <Card
        className="text-center grow"
        key={this.props.item.id}
        bg={this.props.item.type === "City" ? "primary" : "success"}
        text={this.props.item.type === "Beach" ? "black" : "white"}
        onClick={() => {
          this.props.handleCardClick(this.props.item);
        }}
        onMouseEnter={() => {
          this.props.handleMouseEnter(this.props.item);
        }}
      >
        <Card.Header>
        {this.props.item.type} {/* Curtesy of https://www.countryflags.io/ */}
          <Card.Img
            variant="top"
            src={
              "https://www.countryflags.io/" +
              this.props.item.iso2 +
              "/flat/32.png"
            }
            bsPrefix="card-icon"
          />
        </Card.Header>

        <Card.Img src={this.props.item.image} alt="Card image" />
        <Card.ImgOverlay>
        <Card.Body>
          <Card.Title>{this.props.item.name}</Card.Title>
        </Card.Body>
        </Card.ImgOverlay>
      </Card>
    );
  }
}

export default DestinationCard;
