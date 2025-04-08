import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import HomePage from "./Home/Home";
import Navbar from "./navbar/navbar";
import Auth from "./Login/Auth";

const AppWrapper = () => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("authenticated") === "true";

  // Only show Navbar if authenticated and not on /login route
  const shouldShowNavbar = isAuthenticated && location.pathname !== "/login";

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/home" : "/login"} />}
        />
        <Route path="/login" element={<Auth />} />
        <Route
          path="/home"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;
