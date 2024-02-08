import React from "react";
import "./_Header.scss";
import logo from "../../assets/logo.jpg"

export default function Header() {
  return <div className="header">
    <img className="logo" src={logo} alt="logo" />
    <h1>Agenda web ✨</h1>
  </div>;
}
