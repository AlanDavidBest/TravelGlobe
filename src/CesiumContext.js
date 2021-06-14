import React from "react";
const CesiumContext = React.createContext();
export const state = {
  viewer: "",
  setInstance: (ref) => {
    console.log(ref);
    state.viewer = ref;
  }
};
export default CesiumContext;
