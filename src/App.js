import { Cartesian3 } from "cesium";
import { Viewer, Entity } from "resium";
import './App.css';

const position = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100);
const pointGraphics = { pixelSize: 10 };

const dummyCredit = document.createElement("div");

function App() {
  return (
    <div className="App">
      <Viewer 
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
        <Entity position={position} point={pointGraphics} />
      </Viewer>
    </div>
  );
}

export default App;
