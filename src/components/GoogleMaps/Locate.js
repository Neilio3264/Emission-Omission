import React from 'react'
import {panTo} from './MapLoad.js'

function Locate() {
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
        <img src="/compass.svg" alt="compass" />
        </button>
    );
}

export default Locate