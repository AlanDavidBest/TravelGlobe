import React, { createRef, useState } from "react";
import { Cartesian3, Color } from "cesium";
import { useCesium, Viewer, Entity, PolygonGraphics } from "resium";
import Plane from "../plane/Plane";
import CesiumContext from "../../CesiumContext";
import countries from "../../data/countries.geo.json";


const position = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100);
const pointGraphics = { pixelSize: 10 };
const dummyCredit = document.createElement("div");


function useClickedItem(e) {
    console.log("E " + JSON.stringify(e));
}

function randomColor() {
    return new Color(Math.random(), Math.random(), Math.random(), 0.0);
}

export default class Global extends React.Component {
    constructor(props) {
        super(props);
        this.ref = createRef();
        this.selected = []
        this.selected["GBR"] = true;
        this.randomColor = randomColor
    }

  componentDidMount() {
    if (this.ref.current && this.ref.current.cesiumElement) {
      this.context.setInstance(this.ref.current.cesiumElement);
    }
  }

// Estonia	Tallinn	59.22N	24.48E

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
        infoBox={true}
        selectionIndicator={false}
        onClick={useClickedItem}
      >
        
            <Entity> {
                countries.features.filter(country => country.geometry.type === 'Polygon').map((country, i) => {
                    var countryCoordinates = [].concat.apply([], country.geometry.coordinates[0]);
                    return (
                        <Entity key={"E" + country.id + i.toString()} name={country.id} description={country.properties.name}>
                            <PolygonGraphics
                                key={country.id + i.toString()}
                                hierarchy={Cartesian3.fromDegreesArray(countryCoordinates)} 
                                fill={true} 
                                material={this.randomColor()} 
                                />;
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
                                    <Entity key={"E" + country.id + i.toString() + "-" + j.toString()} name={country.id} description={country.properties.name}>
                                        <PolygonGraphics 
                                            key={country.id + i.toString() + "-" + j.toString()}
                                            hierarchy={Cartesian3.fromDegreesArray(polyCoords)} 
                                            fill={true} 
                                            material={ this.selected[country.id] ? Color.RED : this.randomColor() } 
                                            />;
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
