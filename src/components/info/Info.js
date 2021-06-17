import React from "react";
import { InfoCarousel } from "../info-carousel/InfoCarousel";
import CapitalCitiesInfo from "../../data/capitalcitiesinfo.json";
import "./Info.css";

export const Info = ({ x, y, item }) => {
  let destination = CapitalCitiesInfo.find(x => x.id === item.id);
  if (!destination) {
    destination = {
      "title": item.name,
      "image": item.image,
      "description": "Unfortunately, we have no data yet!",
      "rating": Math.floor(Math.random() * 5),
      "weather": [],
      "currency": [],
      "languages": []
    }
  }

  return (
    <div className="infoContainer" style={{ top: `${y}px`, left: `${x}px` }}>
      <div className="infoCarouselContainer">
        <InfoCarousel {...destination} />
      </div>
    </div>
  );
};
export default Info;