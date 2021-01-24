import React, { useRef } from "react";
import "./DropdownContainer.css";

export let selectedCarDrop = "Sedan";
export let selectedFuelDrop = "Gasoline";

function DropdownContainer({ dropDownHeader, options }) {
  const refDrop = useRef("Sedan");

  const onSelected = () => {
    if (dropDownHeader === "Car:") {
      refDrop.current.focus();
      selectedCarDrop = refDrop.current.value;
    } else {
      refDrop.current.focus();
      selectedFuelDrop = refDrop.current.value;
    }
  };
  let optionList =
    options.length > 0 &&
    options.map((item, i) => {
      return <option key={i}>{item}</option>;
    }, this);

  return (
    <div class="wrapper">
      <h2 class="drop-title">{dropDownHeader}</h2>
      <select ref={refDrop} onChange={onSelected}>
        {optionList}
      </select>
    </div>
  );
}

export default DropdownContainer;
