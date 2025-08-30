import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Title from "./components/Title";
import StatesBar from "./components/StatesBar";

function App() {
  return (
    <>
      <Title />
      <StatesBar />
    </>
  );
}

export default App;
