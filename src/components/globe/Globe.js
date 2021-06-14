import React, { createRef } from "react";
import { Cartesian3, Color } from "cesium";
import { Viewer, Entity, PolygonGraphics } from "resium";
import Plane from "../plane/Plane";
import CesiumContext from "../../CesiumContext";
import countries from "../../data/countries.geo.json";

const position = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100);
const pointGraphics = { pixelSize: 10 };
const dummyCredit = document.createElement("div");

export default class Global extends React.Component {
  constructor(props) {
    super(props);
    this.ref = createRef();
  }

  componentDidMount() {
    if (this.ref.current && this.ref.current.cesiumElement) {
      this.context.setInstance(this.ref.current.cesiumElement);
    }
  }
  render() {
    return (
      <Viewer
        ref={this.ref}
        full
        creditContainer={dummyCredit}
        timeline={false}
        animation={false}
        fullscreenButton={false}
        sceneModePicker={false}
        baseLayerPicker={true}
        projectionPicker={false}
        navigationHelpButton={false}
        homeButton={false}
        geocoder={false}
      >
        
            <Entity> {
                countries.features.filter(country => country.geometry.type === 'Polygon').map((country, i) => {
                    var countryCoordinates = [].concat.apply([], country.geometry.coordinates[0]);
                    return (
                        <Entity name={country.id} description={country.properties.name}>
                            <PolygonGraphics hierarchy={Cartesian3.fromDegreesArray(countryCoordinates)} fill={true} material={new Color(1.0, 1.0, 1.0, 0)} outline={true} outlineColor={Color.RED} outlineWidth={10} />;
                        </Entity>
                    )
                })
            }
            </Entity>
            <Entity> {
                countries.features.filter(country => country.geometry.type === 'MultiPolygon').map((country, i) => {
                    return (
                            country.geometry.coordinates.map((polygon, j) => {
                                var  polyCoords = [].concat.apply([], polygon[0])
                                return (
                                    <Entity name={country.id} description={country.properties.name}>
                                        <PolygonGraphics hierarchy={Cartesian3.fromDegreesArray(polyCoords)} fill={true} material={new Color(1.0, 1.0, 1.0, 0)} outline={true} outlineColor={Color.RED} outlineWidth={10}/>;
                                    </Entity>
                                )
                            }
                            )
                    )
                        }
                )
            }
            </Entity>
       
        <Entity position={position} point={pointGraphics} />

        <Plane longitude={-0.124625} latitude={51.510357} elevation={100000} />
      </Viewer>
    );
  }
}
Global.contextType = CesiumContext;
