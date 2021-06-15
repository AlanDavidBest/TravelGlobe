import React from "react";
const CesiumContext = React.createContext();
export const state = {
  viewer: "",
  setInstance: (ref) => {
    state.viewer = ref;
  }
};
export default CesiumContext;
