import "./App.scss";
import Calendar from "./components/Calendar/Calendar.jsx";
import Header from "./components/Header/Header.jsx";
import React from "react";
import Footer from "./components/footer/Footer.jsx";
import EventForm from "./components/EventForm/EventForm.jsx";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Calendar />
      <EventForm></EventForm>
      <Footer />
    </div>
  );
}
