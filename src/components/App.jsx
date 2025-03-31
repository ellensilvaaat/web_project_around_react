import React from "react";
import "../index.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

function App() {
  return (
    <div className="page__content">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;

