import React from "react";
import { Image } from "react-bootstrap";
import "./OtbImage.css";

function OtbImage(props) {
  return (
    <div className="otbimage">
      <Image 
        src="otb.png"
        id="otbImage"
      />
    </div>
  );
}

export default OtbImage;
