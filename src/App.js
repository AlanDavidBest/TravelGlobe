import { useRef } from "react";
import { Cartesian2, Cartesian3, ScreenSpaceEventType } from "cesium";
import { Viewer, Entity, ScreenSpaceEvent, ScreenSpaceEventHandler } from "resium";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const dotPosition = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 0);
const pointGraphics = { pixelSize: 10 };

const dummyCredit = document.createElement("div");

const screenClickToCartesian3 = (current, x, y) => {
  const scene = current?.cesiumElement?.scene;
  if (!scene) return;
  const ellipsoid = scene.globe.ellipsoid;
  return scene.camera.pickEllipsoid(new Cartesian2(x, y), ellipsoid);
}

function App() {
  const currentCesium = useRef(null);

  const check = ({ position: clickPosition }) => {
    const screenClickAsCartesian3 = screenClickToCartesian3(currentCesium.current, clickPosition.x, clickPosition.y);
    console.log("Clicked on position!")
    // TODO: Open popover on this position. How do we do this?
  }

  return (
    <div className="App">
        <Viewer
          full
          ref={currentCesium}
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
          <ScreenSpaceEventHandler>
            <ScreenSpaceEvent type={ScreenSpaceEventType.RIGHT_CLICK} action={check} />
          </ScreenSpaceEventHandler>
          <Entity onClick={check} position={dotPosition} point={pointGraphics} />
        </Viewer>
    </div>
  );
}

export default App;
