import "./App.scss";
import Calendar from "./components/Calendar/Calendar.jsx";
import Header from "./components/Header/Header.jsx";
import React from "react";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Calendar />
    </div>
  );
}
