import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import VehicleInfo from "./pages/VehicleInfo";
import ProtectedRoute from "./ProtectedRoute";
import RedirectRoute from "./RedirectRoute";

const App = () => {
  const [user, setUser] = useState(false);
  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, []);
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <RedirectRoute user={user}>
              <Login />
            </RedirectRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <VehicleInfo />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
