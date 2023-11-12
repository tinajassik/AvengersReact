import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import AvengerGallery from "./components/AvengerGallery";
import AvengerDetails from "./components/AvengerDetails";
// import DetailsView from './routes/DetailsView';
// import MainView from './routes/MainView';

export default function App() {
  return (
    <div className="App">
       <h1 className="mainTitle">Marvel universe</h1>
      <HashRouter>
        <Routes>
          <Route path="/" element={<AvengerGallery/>}>
          </Route>
          <Route path="/details/:avengerId" element={<AvengerDetails/>}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
}
