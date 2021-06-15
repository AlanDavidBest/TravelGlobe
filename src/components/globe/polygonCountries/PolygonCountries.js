import React from "react";
import { Cartesian3, Color } from "cesium";
import { Entity, PolygonGraphics } from "resium";
import countries from "../../../data/countries.geo.json";

class PolygonCountries extends React.Component {
  constructor(props) {
    super(props);
    this.randomColor = this.randomColor.bind(this);
  }

  randomColor() {
    //return new Color(Math.random(), Math.random(), Math.random(), 0.5);
    return new Color(1.0, 1.0, 0.0, 0);
  }
  render() {
    return (
      <>
        {countries.features.map((country, i) => {
          if (country.geometry.type === "Polygon") {
            var countryCoordinates = [].concat.apply(
              [],
              country.geometry.coordinates[0]
            );
            return (
              <Entity
                key={"E" + country.id + i.toString()}
                name={country.id}
                description={country.properties.name}
              >
                <PolygonGraphics
                  key={country.id + i.toString()}
                  hierarchy={Cartesian3.fromDegreesArray(countryCoordinates)}
                  fill={true}
                  material={this.randomColor()}
                />
              </Entity>
            );
          } else {
            return country.geometry.coordinates.map((polygon, j) => {
              var polyCoords = [].concat.apply([], polygon[0]);
              return (
                <Entity
                  key={"E" + country.id + i.toString() + "-" + j.toString()}
                  name={country.id}
                  description={country.properties.name}
                >
                  <PolygonGraphics
                    key={country.id + i.toString() + "-" + j.toString()}
                    hierarchy={Cartesian3.fromDegreesArray(polyCoords)}
                    fill={true}
                    material={this.randomColor()}
                  />
                </Entity>
              );
            });
          }
        })}
      </>
    );
  }
}

export default PolygonCountries;
