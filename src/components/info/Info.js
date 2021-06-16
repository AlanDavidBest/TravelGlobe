import React from "react";
import { InfoCarousel } from "../info-carousel/InfoCarousel";
import "./Info.css";

export const Info = ({ x, y }) => {
  const destination =
  {
    title: "Sunny Manchester",
    image: "https://www.thetreecenter.com/c/uploads/palm-trees-beach-scaled-2048x1146.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget diam ut purus venenatis molestie. Sed mollis dui et arcu blandit tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget diam ut purus venenatis molestie.",
    rating: 2,
    weather: [
      { name: "Spring", celcius: 11 },
      { name: "Summer", celcius: 20 },
      { name: "Autumn", celcius: 9 },
      { name: "Winter", celcius: 4 }
    ],
    currency: [
      { icon: "£", amount: 1, atHome: true, prepend: true },
      { icon: "¥", amount: 1.5, atHome: false, prepend: false }
    ],
    languages: [
      "French", "Spanish"
    ]
  };

  return (
    <div className="infoContainer" style={{ top: `${y}px`, left: `${x}px` }}>
      <div className="infoCarouselContainer">
        <InfoCarousel {...destination} />
      </div>
    </div>
  );
};
export default Info;