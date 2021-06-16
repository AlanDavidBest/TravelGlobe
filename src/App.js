import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Globe from "./components/globe/Globe.js";
import OtbImage from "./components/otbimage/OtbImage";
import CesiumContext, { state } from "./CesiumContext";

function App() {
  
  return (
    <div className="App">
      <CesiumContext.Provider value={state}>
        <Globe />
        <OtbImage />
      </CesiumContext.Provider>
    </div>
  );
}

export default App;
