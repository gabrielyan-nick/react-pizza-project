import axios from "axios";
import { Header } from "../src/components/index";
import { Routes, Route } from "react-router-dom";
import { MainPage, CardPage } from "../src/pages/index";

import "./styles/app.scss";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <Routes>
          <Route path={"/"} element={<MainPage />} />
          <Route path={"/card"} element={<CardPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
