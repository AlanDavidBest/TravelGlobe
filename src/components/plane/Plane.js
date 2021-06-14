import { Cartesian3 } from "cesium";
import { Entity } from "resium";
import planeModel from "../../models/Cesium_Air.glb"


function Plane(props) {
  return (
    <Entity
      position={Cartesian3.fromDegrees(
        props.longitude,
        props.latitude,
        props.elevation
      )}
      model={{
        uri: planeModel,
        maximumScale: 10000,
        minimumPixelSize: 256,
      }}
      // tracked
    />
  );
}

export default Plane;
