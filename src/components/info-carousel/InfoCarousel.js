import React from "react";
import { Carousel } from "react-bootstrap";
import "./InfoCarousel.css";

export const InfoCarousel = ({ title, image, description, rating, weather, currency, languages }) => (
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

                <div class="description">{description}</div>
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
            <InfoWidget title={title} currency={currency} languages={languages} />

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
    const getWeatherIcon = (season) => {
        if (season === "Winter") return (<i class="fas fa-snowflake"></i>);
        if (season === "Summer") return (<i class="fas fa-sun"></i>);
        if (season === "Autumn") return (<i class="fas fa-cloud-sun-rain"></i>)
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
                                getWeatherIcon(w.name)
                            }
                            <h4>{`${w.celcius}'C`}</h4>
                        </div>
                    ))
                }
            </div>

            <div class="weather-container">
                        <div className="weather-item">
                            <h3>From MAN: </h3>
                            <i class="fas fa-plane"></i>
                            <h4>02:45hrs</h4>
                        </div>
                        <div className="weather-item">
                            <h3>From LPL: </h3>
                            <i class="fas fa-plane"></i>
                            <h4>02:57hrs</h4>
                        </div>
                        <div className="weather-item">
                            <h3>From BHX: </h3>
                            <i class="fas fa-plane"></i>
                            <h4>02:32hrs</h4>
                        </div>
            </div>
        </Carousel.Caption>
    )
}

const InfoWidget = ({ title, currency, languages }) => {
    const atHomeCurrency = currency.filter(c => c.atHome === true);
    const otherCurrencies = currency.filter(c => c.atHome === false);

    return (
        <Carousel.Caption>
            <>
            <h1>{title}</h1>
            <div class="currency-container">
                <h4>Your Local Currency:</h4>
                {
                    atHomeCurrency.map((c) => (
                        <div className="currency-item-athome">
                            { c.prepend &&
                                <span>{`${c.icon}${c.amount}`}</span>
                            }

                            { !c.prepend &&
                                <span>{`${c.amount}${c.icon}`}</span>
                            }
                        </div>
                    ))
                }

                <h4>Your Destination Currency Rate:</h4>
                {
                    otherCurrencies.map((c) => (
                        <div className="currency-item">
                            { c.prepend &&
                                <span>{`${c.icon}${c.amount}`}</span>
                            }

                            { !c.prepend &&
                                <span>{`${c.amount}${c.icon}`}</span>
                            }
                        </div>
                    ))
                }
            </div>

            <div class="language-container">
                <h4>Your Destination Languages:</h4>
                {
                    languages.map((l, i) => (
                        <span>
                            {i > 0 && ", "}
                            {`${l}`}
                        </span>
                    ))
                }
            </div>
            </>
        </Carousel.Caption>
    )
}

export default InfoCarousel;