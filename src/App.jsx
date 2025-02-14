import React from "react";
import { Routes, Route } from "react-router-dom";
import Details from "./pages/Details";
import Home from "./pages/Home";
import MainLayouts from "./layouts/MainLayouts";

function App() {
  return (
    <div className="container mx-auto ">
      <Routes>
        <Route
          path="/"
          element={
            <MainLayouts>
              <Home></Home>
            </MainLayouts>
          }
        ></Route>
        <Route
          path="/:id"
          element={
            <MainLayouts>
              <Details></Details>
            </MainLayouts>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
