import React from "react";
import { Carousel } from "react-bootstrap";
import "./InfoCarousel.css";

export const InfoCarousel = ({ slides }) => (
    <Carousel>
        {
            slides.map(slide => (
                <Carousel.Item>
                    <img
                        className="d-block"
                        src={slide.img}
                        alt={slide.title}
                    />
                    <Carousel.Caption>
                        <h3>{slide.title}</h3>
                        <p>{slide.description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))
        }
    </Carousel>
);

export default InfoCarousel;