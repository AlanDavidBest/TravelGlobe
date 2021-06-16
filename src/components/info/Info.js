import React from "react";
import { InfoCarousel } from "../info-carousel/InfoCarousel";
import CapitalCitiesInfo from "../../data/capitalcitiesinfo.json";
import "./Info.css";

export const Info = ({ locationId, locationName, x, y }) => {
  let destination = CapitalCitiesInfo.find(x => x.id === locationId);

  if (!destination) {
    destination = {
      "title": locationName,
      "image": `https://source.unsplash.com/1600x900/?${locationName}`,
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