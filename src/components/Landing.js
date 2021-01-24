import React from 'react'
import './Landing.css'
import ScrollButton from './ScrollButton'

function Landing() {
    return (
        <header class="landing-header">
            <div class="landing-text-wrapper">
                <ScrollButton></ScrollButton>
                <h1 class="landing-title">The Average Car Produces About 4.6 Metric Tons of Carbon Emissions Each Year</h1>
                <h2 class="landing-tagline">How Much Will Your Trip Produce?</h2>
                <div class="gradient"></div>
            </div>
        </header>
    )
}

export default Landing