import { Cartesian3 } from "cesium";
import { Entity } from "resium";

function Plane(props) {
  return (
    <Entity
      position={Cartesian3.fromDegrees(props.longitude, props.latitude, props.elevation)}
      model={{
        uri: "models/Cesium_Air.glb",
        maximumScale: 30000,
        minimumPixelSize: 512,
      }}
      // tracked
    />
  );
}

export default Plane;
