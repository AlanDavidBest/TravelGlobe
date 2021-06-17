import React from "react";
import { Carousel, Button, Card } from "react-bootstrap";
import "./InfoCarousel.css";

export const InfoCarousel = ({ title, image, description, rating, weather, currency, languages }) => (
    <Carousel interval={null} indicators>
        <Carousel.Item>
            <Carousel.Caption>
                <h1>{title}</h1>
                <a href="https://onthebeach.co.uk" target="_blank" rel="noopener noreferrer">
                  <Button>Search this Destination</Button>
                </a>
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
                            <span key={i}>⭐</span>
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

        <Carousel.Item>
            <DealsWidget title={title} />

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
            <h1>☁️ {title} ☁️</h1>
            <div className="weather-container">
                {
                    weather.map(({ name, celsius }) => (
                        <div className="weather-item">
                            <h3>{name}</h3>
                            {
                                getWeatherIcon(name)
                            }
                            <h4>{`${celsius}'C`}</h4>
                        </div>
                    ))
                }
            </div>

            <div className="weather-container">
                        <div className="weather-item">
                            <h4>From MAN: </h4>
                            <i className="fas fa-plane" />
                            <h5>02:45hrs</h5>
                        </div>
                        <div className="weather-item">
                            <h4>From LPL: </h4>
                            <i className="fas fa-plane" />
                            <h5>02:57hrs</h5>
                        </div>
                        <div className="weather-item">
                            <h4>From BHX: </h4>
                            <i className="fas fa-plane" />
                            <h5>02:32hrs</h5>
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
            <h1>💵 {title} 💵</h1>
            <div class="currency-container">
                <h4>Your Local Currency:</h4>
                {
                    atHomeCurrency.map((c) => (
                        <div className="currency-item-athome">
                            { c.prepend &&
                                <h4>{`${c.icon}${c.amount}`}</h4>
                            }

                            { !c.prepend &&
                                <h4>{`${c.icon}${c.amount}`}</h4>
                            }
                        </div>
                    ))
                }

                <h4>Your Destination Currency Rate:</h4>
                {
                    otherCurrencies.map((c) => (
                        <div className="currency-item">
                            { c.prepend &&
                                <h4>{`${c.icon}${c.amount}`}</h4>
                            }

                            { !c.prepend &&
                                <h4>{`${c.icon}${c.amount}`}</h4>
                            }
                        </div>
                    ))
                }
            </div>

            <div class="language-container">
                <h4>Your Destination Languages:</h4>
                {
                    languages.map((l, i) => (
                        <h4>
                            {i > 0 && ", "}
                            {`${l}`}
                        </h4>
                    ))
                }
            </div>
            </>
        </Carousel.Caption>
    )
}

const DealsWidget = ({ title }) => {
    return (
        <Carousel.Caption>
            <h1>🔥 Holiday Deals! 🔥</h1>

            <br/>
            <div style={{ display: 'flex', color: 'black'}}>
                <Card style={{ width: '10rem', marginLeft: '5px', marginRight: '5px' }}>
                    <Card.Body>
                        <Card.Title>Basic</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">£99pp</Card.Subtitle>
                        <Card.Text className="text-muted">
                            Two star hotel for 4 nights!
                        </Card.Text>
                        <Card.Link href="#">BUY NOW</Card.Link>
                    </Card.Body>
                </Card>

                <Card style={{ width: '10rem', marginLeft: '5px', marginRight: '5px' }}>
                    <Card.Body>
                        <Card.Title>Premium</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">£149pp</Card.Subtitle>
                        <Card.Text className="text-muted">
                            Three star hotel for 4 nights!
                        </Card.Text>
                        <Card.Link href="#">BUY NOW</Card.Link>
                    </Card.Body>
                </Card>
                
                <Card style={{ width: '10rem', marginLeft: '5px', marginRight: '5px' }}>
                    <Card.Body>
                        <Card.Title>All-Star</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">£259pp</Card.Subtitle>
                        <Card.Text className="text-muted">
                            Five star hotel for 4 nights!
                        </Card.Text>
                        <Card.Link href="#">BUY NOW</Card.Link>
                    </Card.Body>
                </Card>
            </div>
        </Carousel.Caption>
    )
}

export default InfoCarousel;