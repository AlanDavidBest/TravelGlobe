import { Container, Row, Col } from "react-bootstrap";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "./components/nav/SideBar.js";
import Globe from "./components/globe/Globe.js";
import "./components/nav/SideBar.css";
import OtbImage from "./components/otbimage/OtbImage";

function App() {
  return (
    <div className="App">
      {/* <Container fluid>
        <Row>
            <Col md={2} id="sidebar-wrapper">      
              
            </Col>
            <Col  md={10} id="page-content-wrapper"> */}
              <SideBar />
              <Globe />
              <OtbImage />
            {/* </Col> 
        </Row>
      </Container> */}
    </div>

  );
}

export default App;
