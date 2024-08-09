import React, { useEffect, useState } from "react";
import { Container, Button, Segment, Header } from "semantic-ui-react";
import "./Home.css";
import soon from "../../assets/soon.png";
import AppMenu from "../components/appMenu/AppMenu";
import SliderInfo from "../components/sliderInfo/SliderInfo";
import { notifyError } from "../utils/Utils";

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
  const toast = () => {

  notifyError("Por favor, corrija os campos vermelhos no formulário.");
  }
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
          <Button onClick={toast}> abrir toast</Button>
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
