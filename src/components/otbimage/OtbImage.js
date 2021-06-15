import React from "react";
import { Image } from "react-bootstrap";
import "./OtbImage.css";
import logo from "../../images/otb.png"

function OtbImage() {
  return  <a href="https://www.onthebeach.co.uk"><Image src={logo} id={"otbImage"} /> </a>
}

export default OtbImage;
