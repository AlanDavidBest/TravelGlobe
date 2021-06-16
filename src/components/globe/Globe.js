import React, { createRef } from "react";
import {
  Cartesian3,
  LabelStyle,
  Cartesian2,
  VerticalOrigin
} from "cesium";
import { Viewer, Entity } from "resium";
import Plane from "../plane/Plane";
import Info from "../info/Info"
import CesiumContext from "../../CesiumContext";
import SideBar from "../nav/SideBar";
import PolygonCountries from "./polygonCountries/PolygonCountries";
import Marker from "../../images/marker.png";
import Color from "cesium/Source/Core/Color";
// import countries from "../../data/countries.geo.json";


function useClickedItem(e) {
  console.log("E " + JSON.stringify(e));
}
const dummyCredit = document.createElement("div");

const positions = Cartesian3.fromDegreesArray([
  -5.661949, 54.554603, -6.197885, 53.867565, -6.95373, 54.073702, -7.572168,
  54.059956, -7.366031, 54.595841, -7.572168, 55.131622, -6.733847, 55.17286,
  -5.661949, 54.554603, -3.005005, 58.635, -4.073828, 57.553025, -3.055002,
  57.690019, -1.959281, 57.6848, -2.219988, 56.870017, -3.119003, 55.973793,
  -2.085009, 55.909998, -2.005676, 55.804903, -1.114991, 54.624986, -0.430485,
  54.464376, 0.184981, 53.325014, 0.469977, 52.929999, 1.681531, 52.73952,
  1.559988, 52.099998, 1.050562, 51.806761, 1.449865, 51.289428, 0.550334,
  50.765739, -0.787517, 50.774989, -2.489998, 50.500019, -2.956274, 50.69688,
  -3.617448, 50.228356, -4.542508, 50.341837, -5.245023, 49.96, -5.776567,
  50.159678, -4.30999, 51.210001, -3.414851, 51.426009, -3.422719, 51.426848,
  -4.984367, 51.593466, -5.267296, 51.9914, -4.222347, 52.301356, -4.770013,
  52.840005, -4.579999, 53.495004, -3.093831, 53.404547, -3.09208, 53.404441,
  -2.945009, 53.985, -3.614701, 54.600937, -3.630005, 54.615013, -4.844169,
  54.790971, -5.082527, 55.061601, -4.719112, 55.508473, -5.047981, 55.783986,
  -5.586398, 55.311146, -5.644999, 56.275015, -6.149981, 56.78501, -5.786825,
  57.818848, -5.009999, 58.630013, -4.211495, 58.550845, -3.005005, 58.635,
]);

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
        y: 0
      }
    };

    this.handleMatchedCities = this.handleMatchedCities.bind(this);
    this.flyToDestination = this.flyToDestination.bind(this);
    this.isPopoverOpen = this.isPopoverOpen.bind(this);
    this.onEntityClick = this.onEntityClick.bind(this);
    this.onViewerMove = this.onViewerMove.bind(this);
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

  onEntityClick = ({ position: { x, y }}) => {
    // const clickAsCartesian3 = screenClickToCartesian3(this.ref.current, x, y);

    this.setState({
      cardPosition: { x, y }
    })
  }

  isPopoverOpen = () => this.state.cardPosition.x > 0 && this.state.cardPosition.y > 0;

  onViewerMove = () => {
    this.setState({
      cardPosition: { x: 0, y: 0 }
    })
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
          onMouseDown={this.onViewerMove}
        >
          <PolygonCountries />

          {this.state.matchedCities.map((entry, i) => {
            return (
              <Entity
                onClick={this.onEntityClick}
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
            {/* <Plane
            longitude={-0.124625}
            latitude={51.510357}
            elevation={100000}
          /> */}
        </Viewer>
        {
          this.isPopoverOpen() &&
            <Info x={this.state.cardPosition.x} y={this.state.cardPosition.y} />
        }
      </>
    );
  }
}
Global.contextType = CesiumContext;
export default Global;
