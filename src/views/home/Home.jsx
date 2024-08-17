import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import soon from "../../assets/soon.png";
import AppMenu from "../components/appMenu/AppMenu";
import SliderInfo from "../components/sliderInfo/SliderInfo";
import "./Home.css";

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
        <Container
          className="logged
        "
        >
          <img
            src={soon}
            className="loggedImg"
            alt="Em breve mais funcionalidades "
          />
          <p>Em breve mais funçoes</p>
        </Container>
      )}
    </div>
  );
};

export default Home;
