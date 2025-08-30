import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Title from "./components/Title";
import StatesBar from "./components/StatesBar";
import TabView from "./components/TabView";

function App() {
  return (
    <>
      <Title />
      <StatesBar />
      <TabView />
    </>
  );
}

export default App;
