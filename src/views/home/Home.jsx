import React, { useEffect, useState } from "react";
import AppMenu from "../components/appMenu/AppMenu.jsx";
import Dashboard from "../dashboard/Dashboard.jsx";
import Landing from "../landing/Landing.jsx";
import "./Home.css";

const Home = () => {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsLogged(true);
    }
  }, []);

  return <>{isLogged ? <Dashboard /> : <Landing />}</>;
};

export default Home;