import React from "react";
import { Nav, Button } from "react-bootstrap";
import DestinationCard from "./destinationCard/DestinationCard";
import Search from "./search/Search";

import "./SideBar.css";

class SideBar extends React.Component {
  
  handleMouseEnter = (item) => {
    this.props.setSelectedItem(item);
    this.props.onClearPopup(); // Close any open popup
    this.props.flyTo(item)
  }

  handleCardClick(item) {
    this.props.flyTo(item);
  }

  openNav() {
    document.getElementById("nav").style.width = "23vw";
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
            <Button variant="dark" className="closebtn"
              onClick={() => this.closeNav()}
            >
            &times;
          </Button>
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
        </Nav>
      </>
    );
  }
}

export default SideBar;
