import React from "react";
import { Nav, Button } from "react-bootstrap";
import DestinationCard from "./destinationCard/DestinationCard";
import Search from "./search/Search";

import "./SideBar.css";

class SideBar extends React.Component {
  handleCardClick = (item) => {
    //this.props.onEntityClick({ position: { x:958.60546875, y:377.59765625 }} );
  }
  
  handleMouseEnter = (item) => {
    this.props.onEntityClick({ position: { x:0, y:0 }} ); // Close any open popup
    this.props.flyTo({ latitude: item.lat, longitude: item.lng })
  }

  openNav() {
    document.getElementById("nav").style.width = "20vw";
  }

  closeNav() {
    document.getElementById("nav").style.width = "0";
  }

  render() {
    return (
      <>
        <Button
          className="openbtn"
          variant="dark"
          onClick={() => {
            this.openNav();
          }}
        >
          ☰
        </Button>
        <Nav
          id="nav"
          className="col-md-12 d-none d-md-block bg-dark sidebar"
        >
          <Nav.Item>
            <Search onSearch={this.props.handleMatchedCities} />
          </Nav.Item>

          {this.props.matchedCities.map((item) => {
            return (
              <Nav.Item key={item.id}>
                <DestinationCard
                  key={item.id}
                  item={item}
                  handleCardClick={this.handleCardClick}
                  handleMouseEnter={this.handleMouseEnter}
                />
              </Nav.Item>
            );
          })}
          <Button
            variant="dark"
            className="closebtn"
            onClick={() => {
              this.closeNav();
            }}
          >
            &times;
          </Button>
        </Nav>
      </>
    );
  }
}

export default SideBar;
