import React from "react";
import { Nav, Card } from "react-bootstrap";
import Search from "./search/Search";
import "./SideBar.css";

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchedCities: [],
    };

    this.handleMatchedCities = this.handleMatchedCities.bind(this);
  }

  handleMatchedCities(matches) {
    console.log(matches);
    this.setState({ matchedCities: matches });
  }

  render() {
    return (
      <Nav
        className="col-md-12 d-none d-md-block bg-dark sidebar"
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <div className="sidebar-sticky"></div>
        <Nav.Item>
          <Search onSearch={this.handleMatchedCities} />
        </Nav.Item>

        {this.state.matchedCities.map((item) => {
          return (
            <Nav.Item>
              <Card>
                <Card.Img variant="top" src="https://picsum.photos/200/100" />
                <Card.Body>
                  <Card.Title>{item.city}</Card.Title>
                  <Card.Text>
                    {item.country}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Nav.Item>
          );
        })}
      </Nav>
    );
  }
}

export default SideBar;
