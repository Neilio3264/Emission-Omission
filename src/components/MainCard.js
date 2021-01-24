import React from "react";
// =============== IMPORTS FOR MAP ======================
import {
  GoogleMap,
  useLoadScript,
  DirectionsService,
  DirectionsRenderer,
  DistanceMatrixService,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete"; //   getLatLng, //   getGeocode,
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import DropdownContainer from "./DropdownContainer.js";
import Output from "./Output.js";
import "./MainCard.css";

const libraries = ["places"];
const mapContainerStyle = {
  width: "60vw",
  height: "750px",
};
const center = {
  lat: 32.987205,
  lng: -96.748258,
};
let gState = {
  origin: "",
  destination: "",
  oLat: 0,
  oLng: 0,
  dLat: 0,
  dLng: 0,
  dist: 0,
  duration: 0,
  distance: 0,
};

export default function MainCard() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
    libraries,
  });

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  const cars = ["sedan", "truck", "hybrid", "luxury"];

  const fuel = ["gasoline", "diesel", "E85"];

  return (
    <div class="main-card">
      <div class="main-wrapper">
        <Directions />
        <div class="label-wrapper">
          <h3>From:</h3>
        </div>
        <div class="location-wrapper">
          <Search /> {/* Can move to where you need */}
        </div>
        <div class="label-wrapper">
          <h3>To:</h3>
        </div>
        <div class="location-wrapper">
          <Search /> {/* Can move to where you need */}
        </div>
        <div class="drop-wrapper">
          <DropdownContainer
            dropDownHeader="Car:"
            options={cars}
            class="carDrop"
          ></DropdownContainer>
          <DropdownContainer
            dropDownHeader="Fuel:"
            options={fuel}
            class="fuelDrop"
          ></DropdownContainer>
          <Output text="Example lbs" class="output"></Output>
        </div>
      </div>
    </div>
  );
}

function Search({ state }) {
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

      if (state === "Origin") {
        gState.origin = address;
        gState.oLat = (await getLatLng(results[0])).lat;
        gState.oLng = (await getLatLng(results[0])).lng;
      } else if (state === "Dest") {
        gState.destination = address;
        gState.dLat = (await getLatLng(results[0])).lat;
        gState.dLng = (await getLatLng(results[0])).lng;
      }
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
              data.map(({ id, description }) => {
                return <ComboboxOption key={id} value={description} />;
              })}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

class Directions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: null,
      distResponse: null,
      travelMode: "DRIVING",
      origin: "",
      destination: "",
      calculate: false,
    };

    this.directionsCallback = this.directionsCallback.bind(this);
    this.distanceCallback = this.distanceCallback.bind(this);
    this.checkDriving = this.checkDriving.bind(this);
    this.getOrigin = this.getOrigin.bind(this);
    this.getDestination = this.getDestination.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }

  directionsCallback(response) {
    console.log(response);

    if (response !== null) {
      if (response.status === "OK") {
        this.setState(() => ({
          response,
        }));
      } else {
        console.log("response: ", response);
      }
    }
  }

  distanceCallback(distResponse) {
    console.log(distResponse);

    if (distResponse !== null) {
      if (distResponse.status === "OK") {
        this.setState(() => ({
          distResponse,
          calculate: false,
        }));
      }
    }
    gState.distance =
      distResponse.rows[0].elements[0].distance.value / 1.60934 / 1000;
    gState.duration = distResponse.rows[0].elements[0].duration.value / 60;
    console.log(gState.distance);
    console.log(gState.duration);
  }

  checkDriving({ target: { checked } }) {
    checked &&
      this.setState(() => ({
        travelMode: "DRIVING",
      }));
  }

  getOrigin(ref) {
    this.origin = ref;
  }

  getDestination(ref) {
    this.destination = ref;
  }

  onClick() {
    if (gState.origin !== "" && gState.destination !== "") {
      this.setState(() => ({
        origin: gState.origin,
        destination: gState.destination,
        calculate: true,
      }));
    }
  }

  onMapClick(...args) {
    console.log("onClick args: ", args);
  }

  render() {
    return (
      <div className="map">
        <div className="map-settings">
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="ORIGIN">Origin</label>
                <br />
                <Search state={"Origin"} />
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="DESTINATION">Destination</label>
                <br />
                <Search state={"Dest"} />
              </div>
            </div>
          </div>

          <button
            className="btn btn-primary"
            type="button"
            onClick={this.onClick}
          >
            Build Route
          </button>
        </div>

        <div className="map-container">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={13}
            center={center}
            /*
            //options={options}
            onLoad={onMapLoad}
            // required
            id="direction-example"
            // required
            mapContainerStyle={{
              height: "400px",
              width: "100%",
            }}
            // required
            zoom={2}
            // required
            center={{
              lat: 0,
              lng: -180,
            }}
            */
            onClick={this.onMapClick}
            onLoad={(map) => {
              console.log("DirectionsRenderer onLoad map: ", map);
            }}
            // optional
            onUnmount={(map) => {
              console.log("DirectionsRenderer onUnmount map: ", map);
            }}
          >
            {this.state.destination !== "" && this.state.origin !== "" && (
              <DirectionsService
                // required
                options={{
                  destination: this.state.destination,
                  origin: this.state.origin,
                  travelMode: this.state.travelMode,
                }}
                // required
                callback={this.directionsCallback}
                // optional
                onLoad={(directionsService) => {
                  console.log(
                    "DirectionsService onLoad directionsService: ",
                    directionsService
                  );
                }}
                // optional
                onUnmount={(directionsService) => {
                  console.log(
                    "DirectionsService onUnmount directionsService: ",
                    directionsService
                  );
                }}
              />
            )}

            {this.state.response !== null && (
              <DirectionsRenderer
                // required
                options={{
                  directions: this.state.response,
                }}
                // optional
                onLoad={(directionsRenderer) => {
                  console.log(
                    "DirectionsRenderer onLoad directionsRenderer: ",
                    directionsRenderer
                  );
                }}
                // optional
                onUnmount={(directionsRenderer) => {
                  console.log(
                    "DirectionsRenderer onUnmount directionsRenderer: ",
                    directionsRenderer
                  );
                }}
              />
            )}

            {this.state.calculate !== false && (
              <DistanceMatrixService
                // required
                options={{
                  origins: [{ lat: gState.oLat, lng: gState.oLng }],
                  destinations: [{ lat: gState.dLat, lng: gState.dLng }],
                  travelMode: "DRIVING",
                }}
                // required
                callback={this.distanceCallback}
              />
            )}
          </GoogleMap>
        </div>
      </div>
    );
  }
}
