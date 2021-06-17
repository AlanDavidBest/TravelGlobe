import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Globe from "./components/globe/Globe.js";
import OtbImage from "./components/otbimage/OtbImage";
import CesiumContext, { state } from "./CesiumContext";
import { useKonamiCode } from "./useKonamiCode";

function App() {
  const konami = useKonamiCode();

  return (
    <div className="App">
      <CesiumContext.Provider value={state}>
        <Globe konami={konami} />
        <OtbImage />
      </CesiumContext.Provider>
    </div>
  );
}

export default App;
