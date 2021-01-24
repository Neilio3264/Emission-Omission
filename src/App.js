import React from "react";
import "./App.css";
import Header from "./components/Header.js";
import MainCard from "./components/MainCard.js";
import Landing from "./components/Landing.js";

export default function App() {
  return (
    <body>
      <div class="page-wrapper">
        <Landing></Landing>
        <Header></Header>
        <MainCard>
        </MainCard>
        <footer></footer>
      </div>
    </body>
  );
}

