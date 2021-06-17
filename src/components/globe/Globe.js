import React, { createRef } from "react";
import { Cartesian3, LabelStyle, Cartesian2, VerticalOrigin } from "cesium";
import { Viewer, Entity } from "resium";
// import Plane from "../plane/Plane";
import Info from "../info/Info";
import CesiumContext from "../../CesiumContext";
import SideBar from "../nav/SideBar";
import PolygonCountries from "./polygonCountries/PolygonCountries";
import YellowMarker from "../../images/marker.png";
import OTBMarker from "../../images/otbMarker.png";
import GreenMarker from "../../images/greenMarker.png";

import POI from "../../images/pointOfInterest2.png";
import Arrow from "../../images/YouAreHere.png";

const COUNTRY_ZOOM = 5000000;
const CITY_ZOOM = 15000;
const dummyCredit = document.createElement("div");
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
      selectedItem: null,
      userLat: 0,
      userLng: 0,
    };

    this.handleUserLocation = this.handleUserLocation.bind(this);
    this.handleMatchedCities = this.handleMatchedCities.bind(this);
    this.flyToDestination = this.flyToDestination.bind(this);
    this.isPopoverOpen = this.isPopoverOpen.bind(this);
    this.onEntityClick = this.onEntityClick.bind(this);
    this.onClearPopup = this.onClearPopup.bind(this);
    this.setSelectedItem = this.setSelectedItem.bind(this);
  }

  setSelectedItem(item) {
    this.setState({ selectedItem: item });
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
    let altitude = destination.type === "Country" ? COUNTRY_ZOOM : CITY_ZOOM;
    this.ref.current.cesiumElement.camera.flyTo({
      destination: Cartesian3.fromDegrees(
        destination.location.longitude,
        destination.location.latitude,
        altitude
      ),
      complete: () => this.defaultPopUp(destination),
    });

    this.setState({
      cardPosition: { x: 0, y: 0 },
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

  defaultPopUp = (destination) => {
    let screenCoords = this.getScreenCentre();
    this.onEntityClick(screenCoords, destination);
  };

  getScreenCentre = () => {
    return {
      position: {
        x: this.ref.current.cesiumElement.container.clientWidth / 2,
        y: this.ref.current.cesiumElement.container.clientHeight / 2,
      },
    };
  };

  onEntityClick = ({ position: { x, y } }, item) => {
    this.setState({
      cardPosition: { x, y },
      selectedItem: item,
    });
  };

  isPopoverOpen = () =>
    this.state.cardPosition.x > 0 && this.state.cardPosition.y > 0;

  onClearPopup = () => {
    this.setState({
      cardPosition: { x: 0, y: 0 },
      selectedItem: null,
    });
  };

  render() {
    return (
      <>
        <SideBar
          {...this.state}
          flyTo={this.flyToDestination}
          handleMatchedCities={this.handleMatchedCities}
          onClearPopup={this.onClearPopup}
          setSelectedItem={this.setSelectedItem}
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
          onMouseDown={this.onClearPopup}
        >
          <PolygonCountries />
          {this.state.matchedCities.map((entry) => {
            let icon =
              entry.type === "Landmark"
                ? POI
                : entry.type === "Country"
                ? GreenMarker
                : entry.type === "City" 
                ? YellowMarker
                : OTBMarker;

              let height = entry.type === "Beach" || entry.type === "Landmark" ? 32 : 44
            return (
              <>
                <Entity
                  onClick={(e) => {
                    this.onEntityClick(e, entry);
                  }}
                  name={entry.city}
                  billboard={{
                    image: icon,
                    width: 32,
                    height: height,
                  }}
                  label={{
                    text: `${entry.name}`,
                    font: "36pt",
                    style: LabelStyle.FILL_AND_OUTLINE,
                    outlineWidth: 3,
                    verticalOrigin: VerticalOrigin.BOTTOM,
                    pixelOffset: new Cartesian2(0, -26),
                  }}
                  position={Cartesian3.fromDegrees(
                    entry.location.longitude,
                    entry.location.latitude,
                    0
                  )}
                />
              </>
            );
          })}
          <Entity
            name={"Me"}
            billboard={{
              image: Arrow,
              width: 44,
              height: 150,
            }}
            position={Cartesian3.fromDegrees(
              this.state.userLng,
              this.state.userLat,
              0
            )}
          />
          {/* <Plane
            longitude={-0.124625}
            latitude={51.510357}
            elevation={100000}
          /> */}
        </Viewer>
        {this.isPopoverOpen() && (
          <Info
            item={this.state.selectedItem}
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
