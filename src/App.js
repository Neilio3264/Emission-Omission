import React from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import "./App.css";
import Header from "./components/Header.js"
import MainCard from "./components/MainCard.js"
//import PageWrapper from "./components/PageWrapper.js"

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
        <Header></Header>
        <MainCard>
            <div class="map-wrapper">
            <WrappedMap
              googleMapURL={`${process.env.REACT_APP_GOOGLE_MAP_URL}&key=${process.env.REACT_APP_GOOGLE_MAP_API}`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>  
        </MainCard>
        <footer></footer>
      </div>
    </body>
  );
}

export default App;
