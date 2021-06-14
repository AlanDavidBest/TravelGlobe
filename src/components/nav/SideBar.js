import React from "react";
import { Nav, Form, FormControl, Button } from "react-bootstrap";
import "./SideBar.css";

function SideBar() {
  return (
    <Nav
      className="col-md-12 d-none d-md-block bg-dark sidebar"
      activeKey="/home"
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      <div className="sidebar-sticky"></div>
      <Nav.Item>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Nav.Item>
    </Nav>
  );
}

export default SideBar;
