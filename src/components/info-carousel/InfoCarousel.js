import React from "react";
import { Carousel } from "react-bootstrap";
import "./InfoCarousel.css";

export const InfoCarousel = ({ title, image, description, rating, weather, currency }) => (
    <Carousel interval={null} indicators>
        <Carousel.Item>
            <Carousel.Caption>
                <h1>{title}</h1>
            </Carousel.Caption>

            <img
                className="d-block"
                src={image}
                alt={title}
            />
        </Carousel.Item>

        <Carousel.Item>
            <Carousel.Caption>
                <h1>{title}</h1>
                <div className="rating-container">
                        {
                            [...Array(rating)].map((s, i) => (
                                <span key={i}>&#9733;</span>
                            ))
                        }
                </div>

                <h4>{description}</h4>
            </Carousel.Caption>

            <div
                className="opacity-container"
            />

            <img
                className="d-block"
                src={image}
                alt={title}
            />
        </Carousel.Item>

        <Carousel.Item>
            <WeatherWidget title={title} weather={weather} />

            <div
                className="opacity-container"
            />

            <img
                className="d-block"
                src={image}
                alt={title}
            />
        </Carousel.Item>

        <Carousel.Item>
            <CurrencyWidget title={title} currency={currency} />

            <div
                className="opacity-container"
            />
            
            <img
                className="d-block"
                src={image}
                alt={title}
            />
        </Carousel.Item>
    </Carousel>
);


const WeatherWidget = ({ title, weather }) => {
    const getWeatherIcon = (temperature) => {
        if (temperature < 8) return (<i class="fas fa-snowflake"></i>);
        if (temperature > 15) return (<i class="fas fa-sun"></i>);
        return (<i class="fas fa-cloud-sun"></i>);
    }

    return (
        <Carousel.Caption>
            <h1>{title}</h1>
            <div class="weather-container">
                {
                    weather.map((w) => (
                        <div className="weather-item">
                            <h3>{w.name}</h3>
                            {
                                getWeatherIcon(w.celcius)
                            }
                            <h4>{`${w.celcius}'C`}</h4>
                        </div>
                    ))
                }
            </div>
        </Carousel.Caption>
    )
}

const CurrencyWidget = ({ title, currency }) => {
    return (
        <Carousel.Caption>
            <h1>{title}</h1>
            <div class="currency-container">
                {
                    currency.map((c) => (
                        <div className={c.atHome ? `currency-item currency-item-athome` : `currency-item`}>
                            { c.prepend &&
                                <h1>{`${c.icon}${c.amount}`}</h1>
                            }

                            { !c.prepend &&
                                <h1>{`${c.amount}${c.icon}`}</h1>
                            }
                        </div>
                    ))
                }
            </div>
        </Carousel.Caption>
    )
}

export default InfoCarousel;