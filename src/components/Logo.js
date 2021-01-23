import React from 'react'
import logo from '../images/EO_2.png';
import "./Logo.css";

function Logo() {
    return(
        <div class="logo-wrapper">
            <img alt="Emission Omission logo" src={logo}></img>
        </div>
    )
}

export default Logo