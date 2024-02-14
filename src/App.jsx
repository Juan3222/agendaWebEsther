import "./App.scss";
import React from "react";
import Calendar from "./components/Calendar/Calendar.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Calendar />
      <Footer />
    </div>
  );
}
