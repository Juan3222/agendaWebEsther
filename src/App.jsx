import "./App.scss";
import Calendar from "./components/Calendar/Calendar.jsx";
import Header from "./components/Header/Header.jsx";
import React from "react";
import Footer from "./components/footer/footer.jsx";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Calendar />
      <Footer />
    </div>
  );
}
