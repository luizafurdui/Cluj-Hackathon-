// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./pages/HomePage.js";
import PopTech from "./pages/PopTech.js";
import SignUpPage from "./components/SignUpPage";
import "./App.css"; // Import the CSS file
import SecurePage from "./components/SecurePage";
import {logout, refresh, tryAuth, getUserDetails} from './api.js';
import LoadingDots from "./components/LoadingDots.js";
import Dashboard from "./pages/Dashboard.js";
import FlowBase from "./components/FlowBase.js";
import TeacherClass from "./pages/TeacherClass.js";
import StudentPage from "./pages/StudentPage.js";
import TeacherClasses from "./pages/TeacherClasses.js";

const backend = process.env.REACT_APP_API_URL;
const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(null); 
  const [userRank, setUserRank] = useState("guest"); // or "client",
  const [userName, setUserName] = useState(""); // New state to hold the user name
  const [userId, setUserId] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const handleLoginSuccess = (refreshToken, token, name, rank  ) => {
    console.log(refreshToken, token, name, rank);
    localStorage.setItem("token", token);
    localStorage.setItem("refresh", refreshToken);
    localStorage.setItem("username", name);
    setAccessToken(token);
    setIsAuthenticated(true);
    setUserName(name);
    setUserRank(rank);
    setIsLoading(true);
  };

  console.log(userRank, userName, userId);

  const handleLoginOnRemountComponent = (isLogged) => {
      // setAccessToken(token);
      if(getUserDetails(setUserName, setUserRank, setUserId)) {
        setIsAuthenticated(true);
        setIsLoading(true);
      }
      else {
        console.log("Token does not exist");
        handleLogout();
      }
      // setUserRank("client"); //TODO @Andrei ask sasha to add ranks in the backend, all new signups are clients
      // setUserName(username); // Set the user name
  }

  useEffect(() => {
    if (isAuthenticated === true && userRank !== "guest") {
      console.log("token updated", userName, userId, userRank);
      setIsLoading(false);
    }
    
  }, [isAuthenticated, userName, userId, userRank]);

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refresh");
    // Make an authenticated request to the server
    console.log("Page refreshed. Using backend:", backend, "and tokens:", token, refreshToken, typeof token);
    console.log(backend);
    async function tryAuthAPI() {
      const isAuth = await tryAuth();
      console.log("Expired Login prevention:", isAuth);
      if (!isAuth) handleLogout();
      else handleLoginOnRemountComponent();
    }

    if (isAuthenticated!==true && token !== "undefined" && token !== null && refreshToken) {
        tryAuthAPI();
    } else if (isAuthenticated !== true || !token || !refreshToken) {
      console.log("Token does not exist", isAuthenticated, token, refreshToken);
      handleLogout();
    }
    else {
      console.log("nothing to be done");
      setIsLoading(false);
    }
  }, []);

  const handleLogout = () => {
    console.log("log out");
    localStorage.setItem("token", undefined);
    localStorage.setItem("refresh", undefined);
    setIsAuthenticated(false);
    setUserRank("guest"); 
    setUserName(undefined);
    logout();
    setIsLoading(false);
  };

  const PrivateRoute = ({ children, ranks }) => {
    if (isLoading) {
      console.log("hits here");
      return <div>Loading...<LoadingDots/></div>;
    }
    console.log("hits there:", userRank, isAuthenticated, isAuthenticated && ranks.includes(userRank));
    console.log("Test sa nu plece la login:", isAuthenticated && ranks.includes(userRank))
    return isAuthenticated && ranks.includes(userRank) ? (
      children
    ) : (
      <Navigate to="/login" />
    );
  };

  return (
    <Router>
      <div className="main-screen">
      <nav className="navbar" style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)", borderRadius: "0 0 10px 10px" }}>
        <ul>
          <li>
            <Link to="/Poptech">PopTech</Link>
          </li>
          <li>
              <Link to="/TeacherClasses">Teacher Classes</Link>
            </li>
          


          {["admin"].includes(userRank) && (
            <li>
              <Link to="/secure-link">Secure Link</Link>
            </li>
          )}
        </ul>
        <ul className="right">
          {isAuthenticated ? (
            <>
            <li style={{ float: "right" }}><p>Welcome, {userName}</p></li>
            <li style={{ float: "right" }}><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              {/* <li style={{ float: "right" }}>
                <Link to="/signup">Sign Up</Link>
              </li> */}
              <li style={{ float: "right" }}>
                <Link to="/login">Welcome Teacher</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className="under-navbar">
        <Routes>
          <Route
            path="/login"
            element={<LoginPage onLoginSuccess={handleLoginSuccess} isAuthenticated={isAuthenticated} />}
          />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/poptech" element={<PopTech />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
           <Route path="/flow/:id" element={<FlowBase/>} />
           <Route path="/TeacherClasses" element={<TeacherClasses />} />
                 <Route path="/student/:id" element={<StudentPage />} />
      <Route path="/TeacherClass/:className" element={<TeacherClass />} />
s          <Route
            path="/secure-link"
            element={
              <PrivateRoute ranks={["admin"]}>
                <SecurePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              <PopTech/>
            }
          />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </div>
      </div>
    </Router>
  );
};

export default App;
