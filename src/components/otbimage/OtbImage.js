import React from "react";
import { Image } from "react-bootstrap";
import "./OtbImage.css";
import logo from "../../images/otb.png"

function OtbImage() {
  return <Image src={logo} id={"otbImage"} />;
}

export default OtbImage;
