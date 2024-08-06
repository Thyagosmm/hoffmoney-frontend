import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Segment, Header } from "semantic-ui-react";
import "./Home.css";
import logo from "../../assets/logo.png";
import AppMenu from "../components/appMenu/AppMenu";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="home">
      <AppMenu className="header" />
      {!isLogged ? (
        <>
          <Container className="information">
            <Slider {...settings}>
              <div className="infoContent">
                <Segment inverted textAlign="center" className="infoContent">
                  <Container className="about">
                    <Header as="h1" inverted>
                      Bem-vindo à Hoffmoney
                    </Header>
                    <img src={logo} alt="Logo da Hoffmoney" className="logo" />
                    <p>Gerenciando seu futuro financeiro com confiança</p>
                  </Container>
                  <Segment className="about" id="about">
                    <Container fluid className="container-text">
                      <Header as="h1" textAlign="center">
                        Sobre Nós
                      </Header>
                      <p>
                        Nossa missão é ajudar você a gerenciar seu futuro
                        financeiro com confiança e segurança.
                      </p>
                    </Container>
                  </Segment>
                </Segment>
              </div>
              <div className="infoContent">
                <Segment inverted textAlign="center" className="infoContent">
                  <Container className="about">
                    <Header as="h1" inverted textAlign="center">
                      Serviços
                    </Header>
                    <div className="ui three column stackable grid">
                      <div className="column">
                        <Segment className="container-text">
                          <Header as="h2">Consultoria Financeira</Header>
                          <p>
                            Ajudamos você a tomar as melhores decisões
                            financeiras.
                          </p>
                        </Segment>
                      </div>
                      <div className="column">
                        <Segment className="container-text">
                          <Header as="h2">Planejamento de Investimentos</Header>
                          <p>
                            Estratégias de investimento personalizadas para
                            você.
                          </p>
                        </Segment>
                      </div>
                      <div className="column">
                        <Segment className="container-text">
                          <Header as="h2">Gestão de Riscos</Header>
                          <p>
                            Proteja seu patrimônio com nossas soluções de gestão
                            de riscos.
                          </p>
                        </Segment>
                      </div>
                    </div>
                  </Container>
                </Segment>
                <Segment inverted textAlign="center" className="infoContent">
                  <Container className="about">
                    <Header as="h1" inverted textAlign="center">
                      Depoimentos
                    </Header>
                    <div className="ui two column stackable grid">
                      <div className="column">
                        <Segment className="container-text">
                          <p>
                            "A Hoffmoney transformou a maneira como gerencio
                            minhas finanças. Recomendo!" - Cliente Satisfeito
                          </p>
                        </Segment>
                      </div>
                      <div className="column">
                        <Segment className="container-text">
                          <p>
                            "Profissionais altamente qualificados e serviços
                            excepcionais." - Cliente Satisfeito
                          </p>
                        </Segment>
                      </div>
                    </div>
                  </Container>
                </Segment>
              </div>
            </Slider>
            <Segment inverted vertical id="contact">
              <Container textAlign="center">
                <p>© 2024 Hoffmoney. Todos os direitos reservados.</p>
                <div className="social-links">
                  <Button
                    circular
                    icon="instagram"
                    as="a"
                    href="https://www.instagram.com"
                  />
                  <Button
                    circular
                    icon="mail"
                    as="a"
                    href="mailto:contato@hoffmoney.com"
                  />
                  <Button circular icon="info" as={Link} to="/sobre" />
                </div>
              </Container>
            </Segment>
          </Container>
        </>
      ) : (
        <Container></Container>
      )}
    </div>
  );
};

export default Home;
