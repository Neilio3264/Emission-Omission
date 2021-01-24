import React from "react";
import "./Output.css"

function Output ({text}) {
    return (
        <div class="output-wrapper">
            <h3 class="output-title">Carbon Emission:</h3>
            <p class="output">{text}</p>
        </div> 
    )
}

export default Output