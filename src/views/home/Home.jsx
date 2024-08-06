import React, { useEffect, useState } from "react";
import { Container, Button, Segment, Header } from "semantic-ui-react";
import "./Home.css";
import AppMenu from "../components/appMenu/AppMenu";
import SliderInfo from "../components/sliderInfo/SliderInfo";

const Home = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const nome = localStorage.getItem("nome");
    const email = localStorage.getItem("email");

    if (userId && nome && email) {
      setIsLogged(true);
    }
  }, []);

  return (
    <div className="home">
      <AppMenu className="header" />
      {!isLogged ? (
        <Container>
          <SliderInfo />
        </Container>
      ) : (
        <Container></Container>
      )}
    </div>
  );
};

export default Home;
