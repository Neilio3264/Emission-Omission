import React from 'react'
import Logo from "./Logo.js"
import Title from "./Title.js"

function Header() {
    return(
        <div id="section1" style={{
            display: "inline-flex",
            flexDirection: "row",
            alignItems: "center",
            color: "#FFFFFF",
            marginLeft: "150px",
            marginRight: "150px",
        }}>
            <Logo></Logo>
            <Title></Title>
        </div>
    )
}

export default Header