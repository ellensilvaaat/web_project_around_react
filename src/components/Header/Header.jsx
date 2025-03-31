import React from "react";
import logo from "../../images/Vector-3.svg";
import line from "../../images/Line.png";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="logo" />
      <img className="header__line" src={line} alt="line" />
    </header>
  );
}

export default Header;


