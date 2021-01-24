import React from "react";
import "./Output.css";

function Output({ miles }) {
  return (
    <div class="output-wrapper">
      <h3 class="output-title">Carbon Emission:</h3>
      <p class="output">{miles} lbs</p>
    </div>
  );
}

export default Output;
