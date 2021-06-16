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

// const screenClickToCartesian3 = (current, x, y) => {
//   const scene = current?.cesiumElement?.scene;
//   if (!scene) return;
//   const ellipsoid = scene.globe.ellipsoid;
//   return scene.camera.pickEllipsoid(new Cartesian2(x, y), ellipsoid);
// }

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
      complete: this.defaultPopUp
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

  defaultPopUp =() => 
    this.onEntityClick( this.getScreenCentre() );
  
  onEntityClick = ({ position: { x, y } }) => {
    // const clickAsCartesian3 = screenClickToCartesian3(this.ref.current, x, y);
    // 958.60546875 Y:377.59765625
    this.setState({
      cardPosition: { x, y },
    });
  };

  isPopoverOpen = () =>
    this.state.cardPosition.x > 0 && this.state.cardPosition.y > 0;

  onViewerMove = () => {
    this.setState({
      cardPosition: { x: 0, y: 0 },
    });
  };


  getScreenCentre = () => {            
    return {
              position: {
                x: this.ref.current.cesiumElement.container.clientWidth / 2, 
                y: this.ref.current.cesiumElement.container.clientHeight / 2
              }
            }
    // var windowPosition = new Cartesian2(this.ref.current.cesiumElement.container.clientWidth / 2, this.ref.current.cesiumElement.container.clientHeight / 2);
    // var pickRay = this.ref.current.cesiumElement.scene.camera.getPickRay(windowPosition);
    // var pickPosition = this.ref.current.cesiumElement.scene.globe.pick(pickRay, this.ref.current.cesiumElement.scene);
    // var pickPositionCartographic = this.ref.current.cesiumElement.scene.globe.ellipsoid.cartesianToCartographic(pickPosition);
    // console.log(pickPositionCartographic.longitude * (180/Math.PI));
    // console.log(pickPositionCartographic.latitude * (180/Math.PI));
    // return pickPositionCartographic;
  }

  render() {
    return (
      <>
        <SideBar
          {...this.state}
          flyTo={this.flyToDestination}
          handleMatchedCities={this.handleMatchedCities}
          onEntityClick={this.onEntityClick}

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
                onClick={this.onEntityClick}
                name={entry.name}
                billboard={{
                  image: Marker,
                  width: 24,
                  height: 36,
                }}
                label={{
                  text: `${entry.name}`,
                  font: "36pt",
                  style: LabelStyle.FILL_AND_OUTLINE,
                  outlineWidth: 3,
                  verticalOrigin: VerticalOrigin.BOTTOM,
                  pixelOffset: new Cartesian2(0, -20),
                }}
                position={Cartesian3.fromDegrees(entry.location.longitude, entry.location.latitude, 0)}
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
          <Info x={this.state.cardPosition.x} y={this.state.cardPosition.y} />
        )}
      </>
    );
  }
}
Global.contextType = CesiumContext;
export default Global;
