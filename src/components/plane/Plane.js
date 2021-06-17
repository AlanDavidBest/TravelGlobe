import { Cartesian3, HeadingPitchRoll, Transforms } from "cesium";
import { Entity } from "resium";
import planeModel from "../../models/Monster.glb";

function Plane(props) {
  
  var position = Cartesian3.fromDegrees(
    props.longitude,
    props.latitude,
    props.elevation
  );
  var hpr = new HeadingPitchRoll(0, 0, 0);
  var orientation = Transforms.headingPitchRollQuaternion(position, hpr);
  return (
    <Entity
      position={position}
      orientation={orientation}

      model={{
        uri: planeModel,
        maximumScale: 10000,
        minimumPixelSize: 128,
        runAnimations: true,
        clampAnimations: true
      }}
      
    />
  );
}

export default Plane;
