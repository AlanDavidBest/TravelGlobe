import React, { createRef } from "react";
import { Nav, Button } from "react-bootstrap";
import DestinationCard from "./destinationCard/DestinationCard";
import Search from "./search/Search";

import "./SideBar.css";

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.ref = createRef();
    this.state = {
      matchedCities: [],
    };
    this.handleMatchedCities = this.handleMatchedCities.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);

  }

  componentDidMount() {
    if (this.ref.current && this.ref.current.cesiumElement) {
      this.context.setInstance(this.ref.current.cesiumElement);
    }
  }

  handleMatchedCities(matches) {
    this.setState({ matchedCities: matches });
  }

  handleCardClick(item) {
    this.props.flyTo({ latitude: item.lat, longitude: item.lng });
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
          activeKey="/home"
          onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        >
          <Nav.Item>
            <Search onSearch={this.handleMatchedCities} />
          </Nav.Item>

          {this.state.matchedCities.map((item) => {
            return (
              <Nav.Item>
                <DestinationCard
                  item={item}
                  handleCardClick={this.handleCardClick}
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
