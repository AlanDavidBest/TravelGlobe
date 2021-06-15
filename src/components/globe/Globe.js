import React, { createRef } from "react";
import {
  Cartesian3,
  LabelStyle,
  Cartesian2,
  VerticalOrigin
} from "cesium";
import { Viewer, Entity } from "resium";
import Plane from "../plane/Plane";
import CesiumContext from "../../CesiumContext";
import SideBar from "../nav/SideBar";
import PolygonCountries from "./polygonCountries/PolygonCountries";
import Marker from "../../images/marker.png";
import Color from "cesium/Source/Core/Color";


function useClickedItem(e) {
  console.log("E " + JSON.stringify(e));
}
const dummyCredit = document.createElement("div");

class Global extends React.Component {
  constructor(props) {
    super(props);
    this.ref = createRef();
    this.selected = [];
    this.selected["GBR"] = false;
    this.state = {
      matchedCities: [],
    };

    this.handleMatchedCities = this.handleMatchedCities.bind(this);
    this.flyToDestination = this.flyToDestination.bind(this);
  }

  handleMatchedCities(matches) {
    this.setState({ matchedCities: matches });
  }

  flyToDestination(destination) {
    this.ref.current.cesiumElement.camera.flyTo({
      destination: Cartesian3.fromDegrees(
        destination.longitude,
        destination.latitude,
        5000000
      ),
    });
  }

  componentDidMount() {
    if (this.ref.current && this.ref.current.cesiumElement) {
      this.context.setInstance(this.ref.current.cesiumElement);
    }
  }
  
  render() {
    return (
      <>
        <SideBar
          {...this.state}
          flyTo={this.flyToDestination}
          handleMatchedCities={this.handleMatchedCities}
        />
        <Viewer
          ref={this.ref}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          creditContainer={dummyCredit}
          timeline={false}
          animation={false}
          fullscreenButton={false}
          sceneModePicker={false}
          baseLayerPicker={false}
          projectionPicker={false}
          navigationHelpButton={false}
          homeButton={false}
          geocoder={false}
          infoBox={true}
          selectionIndicator={false}
          onClick={useClickedItem}
        >
          <PolygonCountries />

          {this.state.matchedCities.map((entry, i) => {
            return (
              <Entity
                name={entry.city}
                billboard={{
                  image: Marker,
                  width: 24,
                  height: 36,
                }}
                label={{
                  text: `${entry.city}, ${entry.iso3}`,
                  font: "36pt",
                  style: LabelStyle.FILL_AND_OUTLINE,
                  outlineWidth: 3,
                  verticalOrigin: VerticalOrigin.BOTTOM,
                  pixelOffset: new Cartesian2(0, -20),
                }}
                position={Cartesian3.fromDegrees(entry.lng, entry.lat, 0)}
              >
              </Entity>
            );
          })}

          {/* <Plane
            longitude={-0.124625}
            latitude={51.510357}
            elevation={100000}
          /> */}
        </Viewer>
      </>
    );
  }
}
Global.contextType = CesiumContext;
export default Global;
