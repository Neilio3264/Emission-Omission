import React from 'react'
import Header from './Header.js'
import MainCard from './MainCard.js'
import './PageWrapper.css'

function PageWrapper() {
    return(
        <div class="page-wrapper">
            <Header></Header>
            <MainCard></MainCard>
        </div>
    )
}

export default PageWrapper