import React from 'react';
import './DropdownContainer.css'

function DropdownContainer ({dropDownHeader, options}) {

    let optionList = options.length > 0
    && options.map((item, i) => {
        return (
            <option key={i}>{item}</option>
        )
    }, this)

    return(
    <div class="wrapper">
        <h2 class="drop-title">{dropDownHeader}</h2>
        <select>
            {optionList}
        </select>
    </div>
    )
}

export default DropdownContainer