import React from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

function Map() {
  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 32.987205, lng: -96.748258 }}
    />
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <div style={{ width: "50vw", height: "50vh" }}>
        <WrappedMap
          googleMapURL={`${process.env.REACT_APP_GOOGLE_MAP_URL}&key=${process.env.REACT_APP_GOOGLE_MAP_API}`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    </div>
  );
}

export default App;
