import React from 'react'
import {Link} from 'react-scroll'
import "./ScrollButton.css"

function ScrollButton () {
    return (
        <Link activeClass="active" to="section1" spy={true} smooth={true} duration={1500}>
            <div class="scroll-button-container">
                <svg class="chevron" width="4rem" height="4rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" color="#FFFFFF"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </div>
        </Link>
    )
}

export default ScrollButton