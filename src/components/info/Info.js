import React from "react";
import { InfoCarousel } from "../info-carousel/InfoCarousel";
import "./Info.css";

export const Info = ({ x, y }) => {
  const slides = [
    {
      title: "Sunny Manchester",
      description: "This is an awesome slide!",
      img: "https://www.thetreecenter.com/c/uploads/palm-trees-beach-scaled-2048x1146.jpg"
    },
    {
      title: "Sunny Manchester",
      description: "This is an awesome slide!",
      img: "https://www.thetreecenter.com/c/uploads/palm-trees-beach-scaled-2048x1146.jpg"
    },
    {
      title: "Sunny Manchester",
      description: "This is an awesome slide!",
      img: "https://www.thetreecenter.com/c/uploads/palm-trees-beach-scaled-2048x1146.jpg"
    }
  ]
  
  return (
    <div className="infoContainer" style={{ top: `${y}px`, left: `${x}px` }}>
      <div className="infoCarouselContainer">
        <InfoCarousel slides={slides} />
      </div>
    </div>
  );
};
export default Info;