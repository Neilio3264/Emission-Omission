import React from "react";

// =============== IMPORTS FOR MAP ======================
// import { GoogleMap, useLoadScript } from "@react-google-maps/api";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from "@reach/combobox";
// import "@reach/combobox/styles.css";
// ======================================================

import "./App.css";
import Header from "./components/Header.js";
import MainCard from "./components/MainCard.js";
//import PageWrapper from "./components/PageWrapper.js"


// ============== BASIC SETTINGS FOR MAP ================
// const libraries = ["places"];
// const mapContainerStyle = {
//   width: "60vw",
//   height: "750px",
// };
// const center = {
//   lat: 32.987205,
//   lng: -96.748258,
// };
// ======================================================

export default function App() {
  // ================= LOAD SCRIPTS FOR MAP ================
  // const { isLoaded, loadError } = useLoadScript({
  //   googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
  //   libraries,
  // });

  // const mapRef = React.useRef();
  // const onMapLoad = React.useCallback((map) => {
  //   mapRef.current = map;
  // }, []);

  // const panTo = React.useCallback(({ lat, lng }) => {
  //   mapRef.current.panTo({ lat, lng });
  //   mapRef.current.setZoom(13);
  // }, []);

  // if (loadError) return "Error";
  // if (!isLoaded) return "Loading...";
  // =======================================================

  return (
    <body>
      <div class="page-wrapper">
        <Header></Header>
        <MainCard>
          {/* ============ MAP, SEARCH, And GEOLOCATION ============= */}
          
          <div class="map-wrapper">
            
            {/* <GoogleMap
              id="map"
              mapContainerStyle={mapContainerStyle}
              zoom={13}
              center={center}
              //options={options}
              onLoad={onMapLoad}
            ></GoogleMap> */}
          </div>
          {/* ======================================================= */}
        </MainCard>
        <footer></footer>
      </div>
    </body>
  );
}

// ================== EVERYTHING BELOW IS FOR MAP =========================

// function Locate({ panTo }) {
//   return (
//     <button
//       className="locate"
//       onClick={() => {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             panTo({
//               lat: position.coords.latitude,
//               lng: position.coords.longitude,
//             });
//           },
//           () => null
//         );
//       }}
//     >
//       <img src="/compass.svg" alt="compass" />
//     </button>
//   );
// }

// // function Search({ panTo }) {
//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue,
//     clearSuggestions,
//   } = usePlacesAutocomplete({
//     requestOptions: {
//       location: { lat: () => 32.987205, lng: () => -96.748258 },
//       radius: 100 * 1000, //meters
//     },
//   });

//   const handleInput = (e) => {
//     setValue(e.target.value);
//   };

//   const handleSelect = async (address) => {
//     setValue(address, false);
//     clearSuggestions();

//     try {
//       const results = await getGeocode({ address });
//       const { lat, lng } = await getLatLng(results[0]);
//       panTo({ lat, lng });
//     } catch (error) {
//       console.log("😱 Error: ", error);
//     }
//   };

//   return (
//     <div className="search">
//       <Combobox onSelect={handleSelect}>
//         <ComboboxInput
//           value={value}
//           onChange={handleInput}
//           disabled={!ready}
//           placeholder="Search your location"
//         />
//         <ComboboxPopover>
//           <ComboboxList>
//             {status === "OK" &&
//               data.map(({ id, description }) => (
//                 <ComboboxOption key={id} value={description} />
//               ))}
//           </ComboboxList>
//         </ComboboxPopover>
//       </Combobox>
//     </div>
//   );
// }
