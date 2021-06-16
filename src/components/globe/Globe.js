import React, { createRef } from "react";
import {
  Cartesian3,
  LabelStyle,
  Cartesian2,
  VerticalOrigin,
  Color,
} from "cesium";
import { Viewer, Entity } from "resium";
// import Plane from "../plane/Plane";
import Info from "../info/Info";
import CesiumContext from "../../CesiumContext";
import SideBar from "../nav/SideBar";
import PolygonCountries from "./polygonCountries/PolygonCountries";
import Marker from "../../images/marker.png";

const dummyCredit = document.createElement("div");

const screenClickToCartesian3 = (current, x, y) => {
  const scene = current?.cesiumElement?.scene;
  if (!scene) return;
  const ellipsoid = scene.globe.ellipsoid;
  return scene.camera.pickEllipsoid(new Cartesian2(x, y), ellipsoid);
}

class Global extends React.Component {
  constructor(props) {
    super(props);
    this.ref = createRef();
    this.infoRef = createRef();
    this.selected = [];
    this.selected["GBR"] = false;
    this.state = {
      matchedCities: [],
      cardPosition: {
        x: 0,
        y: 0,
      },
      locationId: null,
      locationName: "",
      userLat: 0,
      userLng: 0,
    };

    this.handleUserLocation = this.handleUserLocation.bind(this);
    this.handleMatchedCities = this.handleMatchedCities.bind(this);
    this.flyToDestination = this.flyToDestination.bind(this);
    this.isPopoverOpen = this.isPopoverOpen.bind(this);
    this.onEntityClick = this.onEntityClick.bind(this);
    this.onViewerMove = this.onViewerMove.bind(this);
  }

  handleMatchedCities(matches) {
    this.setState({ matchedCities: matches });
  }

  handleUserLocation(latitude, longitude) {
    this.setState({
      userLat: latitude,
      userLng: longitude,
    });
  }

  flyToDestination(destination) {
    this.ref.current.cesiumElement.camera.flyTo({
      destination: Cartesian3.fromDegrees(
        destination.longitude,
        destination.latitude,
        5000000
      ),
    });

    this.setState({

      cardPosition: { x: 0, y: 0 }
    });
  }

  componentDidMount() {
    if (this.ref.current && this.ref.current.cesiumElement) {
      this.context.setInstance(this.ref.current.cesiumElement);
    }

    let latitude = 0;
    let longitude = 0;
    let self = this;
    navigator.geolocation.getCurrentPosition(function (position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      self.handleUserLocation(latitude, longitude);
    });
  }

  onEntityClick = ({ position: { x, y } }, { id, city }) => {
    // const clickAsCartesian3 = screenClickToCartesian3(this.ref.current, x, y);
    //
    this.setState({
      cardPosition: { x, y },
      locationId: id,
      locationName: city,
    });
  };

  isPopoverOpen = () =>
    this.state.cardPosition.x > 0 && this.state.cardPosition.y > 0;

  onViewerMove = () => {
    this.setState({
      cardPosition: { x: 0, y: 0 },
    });
  };

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
          infoBox={false}
          selectionIndicator={false}
          onMouseDown={this.onViewerMove}
        >
          <PolygonCountries />

          {this.state.matchedCities.map((entry) => {
            return (
              <Entity
                onClick={e => this.onEntityClick(e, entry)}
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
              ></Entity>
            );
          })}
          <Entity
            name={"Me"}
            point={{
              pixelSize: 10,
              color: Color.YELLOW,
              outlineColor: Color.RED,
              outlineWidth: 3,
            }}
            label={{
              text: "Me",
              font: "36pt",
              style: LabelStyle.FILL_AND_OUTLINE,
              outlineWidth: 3,
              verticalOrigin: VerticalOrigin.BOTTOM,
              pixelOffset: new Cartesian2(0, -20),
            }}
            position={Cartesian3.fromDegrees(
              this.state.userLng,
              this.state.userLat,
              0
            )}
          ></Entity>

          {/* <Plane
            longitude={-0.124625}
            latitude={51.510357}
            elevation={100000}
          /> */}
        </Viewer>
        {this.isPopoverOpen() && (
          <Info
            locationId={this.state.locationId}
            locationName={this.state.locationName}
            x={this.state.cardPosition.x}
            y={this.state.cardPosition.y}
          />
        )}
      </>
    );
  }
}

Global.contextType = CesiumContext;

export default Global;
