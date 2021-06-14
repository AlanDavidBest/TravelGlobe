import React, { useState, createRef } from "react";
import { Cartesian3, Color } from "cesium";
import { Viewer, Entity, PolygonGraphics } from "resium";
import Plane from "../plane/Plane";
import CesiumContext from "../../CesiumContext";
import countries from "../../data/countries.geo.json";

const position = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100);
const pointGraphics = { pixelSize: 10 };
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
        <Entity name="United Kingdom" description="United Kingdom Polygon">
          <PolygonGraphics hierarchy={positions} material={Color.GREEN} />
        </Entity>

        <Entity position={position} point={pointGraphics} />

        <Plane longitude={-0.124625} latitude={51.510357} elevation={100000} />
      </Viewer>
    );
  }
}
Global.contextType = CesiumContext;
