import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import VehicleInfo from "./pages/VehicleInfo";
import ProtectedRoute from "./ProtectedRoute";
import RedirectRoute from "./RedirectRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path=""
          element={
            <RedirectRoute>
              <Login />
            </RedirectRoute>
          }
        />
        <Route
          path="vehicle-info"
          element={
            <ProtectedRoute>
              <VehicleInfo />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
