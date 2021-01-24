import React from 'react'
// =============== IMPORTS FOR MAP ======================
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import DropdownContainer from './DropdownContainer.js'
import Output from './Output.js'
import './MainCard.css'


const libraries = ["places"];
const mapContainerStyle = {
  width: "60vw",
  height: "750px",
};
const center = {
  lat: 32.987205,
  lng: -96.748258,
};

export default function MainCard() {

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
        libraries,
      });
    
      const mapRef = React.useRef();
      const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
      }, []);
    
      const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(13);
      }, []);
    
      if (loadError) return "Error";
      if (!isLoaded) return "Loading...";

      const cars = [
          'sedan',
          'truck',
          'hybrid',
          'luxury',
      ]

      const fuel = [
        'gasoline',
        'diesel',
        'E85',
    ]

    return (
        <div class = 'main-card'>
            <div class='main-wrapper'>
                <GoogleMap
                    id="map"
                    mapContainerStyle={mapContainerStyle}
                    zoom={13}
                    center={center}
                    //options={options}
                    onLoad={onMapLoad}
                ></GoogleMap>
                <div class = 'label-wrapper'>
                    <h3>From:</h3>
                </div>
                <div class = 'location-wrapper'>
                    <Search panTo={panTo} /> {/* Can move to where you need */}
                    <Locate panTo={panTo} />
                </div>
                <div class = 'label-wrapper'>
                    <h3>To:</h3>
                </div>
                <div class = 'location-wrapper'>
                    <Search panTo={panTo} /> {/* Can move to where you need */}
                    <Locate panTo={panTo} />
                </div>
                <div class='drop-wrapper'>
                    <DropdownContainer dropDownHeader = 'Car:' options = {cars} class="carDrop"></DropdownContainer>
                    <DropdownContainer dropDownHeader = 'Fuel:' options = {fuel} class="fuelDrop"></DropdownContainer>
                    <Output text = 'Example lbs' class="output"></Output>
                </div>
            </div>
        </div>
    )
}


function Locate({ panTo }) {
    return (
    <button
        className="locate"
        onClick={() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
            panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
            },
            () => null
        );
        }}
    >
        <img src="/compass.svg" alt="current location" />
    </button>
    );
}

function Search({ panTo }) {
    const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
    } = usePlacesAutocomplete({
    requestOptions: {
        location: { lat: () => 32.987205, lng: () => -96.748258 },
        radius: 100 * 1000, //meters
    },
    });

    const handleInput = (e) => {
    setValue(e.target.value);
    };

    const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        panTo({ lat, lng });
    } catch (error) {
        console.log("😱 Error: ", error);
    }
    };

    return (
    <div className="search">
        <Combobox onSelect={handleSelect}>
        <ComboboxInput
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder="Enter a location"
        />
        <ComboboxPopover>
            <ComboboxList>
            {status === "OK" &&
                data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
                ))}
            </ComboboxList>
        </ComboboxPopover>
        </Combobox>
    </div>
    );
}