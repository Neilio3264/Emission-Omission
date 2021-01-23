import React from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import "./App.css";

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
    <body>
      <div class="page-wrapper">
        <header>
          <div class="header-wrapper">
            <div class="logo-wrapper">
              <img
                class="logo"
                alt="Emission Omission logo"
                src="./images/EO_2.png"
              ></img>
            </div>
            <div class="title-wrapper">
              <h1 class="title">Emission Omission</h1>
              <h1 class="title-pipe">|</h1>
              <h2 class="tagline">Track Your Emissions</h2>
            </div>
          </div>
        </header>
        <div class="main-card">
          <div class="map-wrapper">
            <WrappedMap
              googleMapURL={`${process.env.REACT_APP_GOOGLE_MAP_URL}&key=${process.env.REACT_APP_GOOGLE_MAP_API}`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
        </div>
        <footer></footer>
      </div>
    </body>
  );
}

export default App;
