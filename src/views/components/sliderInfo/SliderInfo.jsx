import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Button, Container, Header, Segment } from "semantic-ui-react";
import images from "../../../assets/images.js";
import "./SliderInfo.css";

const SliderInfo = () => {
  const [slidesToShow, setSlidesToShow] = useState(2);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 500) {
        // Ajuste o valor conforme necessário
        setSlidesToShow(1);
      } else {
        setSlidesToShow(1);
      }
    };

    // Verifica o tamanho da tela ao carregar a página
    handleResize();

    // Adiciona o event listener para redimensionamento da janela
    window.addEventListener("resize", handleResize);

    // Remove o event listener ao desmontar o componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Container className="information">
      <Slider className="sliderContent" {...settings}>
        <Container fluid className="infoContent">
          <Segment inverted textAlign="center" className="infoContent">
            <Container fluid className="about">
              <Header as="h1" inverted>
                Bem-vindo à Hoffmoney
              </Header>
              <img src={images.logo} alt="Logo da Hoffmoney" className="logo" />
              <p>Gerenciando seu futuro financeiro com confiança</p>
            </Container>
            <Segment className="about" id="about">
              <Container fluid className="container-text">
                <Header as="h1" textAlign="center">
                  Sobre Nós
                </Header>
                <p>
                  Nossa missão é ajudar você a gerenciar seu futuro financeiro
                  com confiança e segurança.
                </p>
              </Container>
            </Segment>
          </Segment>
        </Container>
        <Container fluid className="infoContent">
          <Segment inverted textAlign="center" className="infoContent">
            <Container fluid className="about">
              <Header as="h1" inverted textAlign="center">
                Serviços
              </Header>
              <Container fluid className="ui three column stackable grid">
                <Container fluid className="column">
                  <Segment className="container-text">
                    <Header as="h2">Consultoria Financeira</Header>
                    <p className="segmentText">
                      Ajudamos você a tomar as melhores decisões financeiras.
                    </p>
                  </Segment>
                </Container>
                <Container fluid className="column">
                  <Segment className="container-text">
                    <Header as="h2">Planejamento de Investimentos</Header>
                    <p className="segmentText">
                      Estratégias de investimento personalizadas para você.
                    </p>
                  </Segment>
                </Container>
                <Container fluid className="column">
                  <Segment className="container-text">
                    <Header as="h2">Gestão de Riscos</Header>
                    <p className="segmentText">
                      Proteja seu patrimônio com nossas soluções de gestão de
                      riscos.
                    </p>
                  </Segment>
                </Container>
              </Container>
            </Container>
          </Segment>
        </Container>
        <Container fluid className="infoContent">
          <Segment inverted textAlign="center" className="infoContent">
            <Container fluid className="about">
              <Header as="h1" inverted textAlign="center">
                Depoimentos
              </Header>
              <Container fluid className="ui two column stackable grid">
                <Container fluid className="column">
                  <Segment className="container-text">
                    <p className="segmentText">
                      "A Hoffmoney transformou a maneira como gerencio minhas
                      finanças. Recomendo!" - Cliente Satisfeito
                    </p>
                  </Segment>
                </Container>
                <Container fluid className="column">
                  <Segment className="container-text">
                    <p className="segmentText">
                      "Profissionais altamente qualificados e serviços
                      excepcionais." - Cliente Satisfeito
                    </p>
                  </Segment>
                </Container>
              </Container>
            </Container>
          </Segment>
        </Container>
      </Slider>
      <Segment inverted vertical id="contact">
        <Container fluid textAlign="center">
          <Container fluid className="social-links">
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
          </Container>
          <p>© 2024 Hoffmoney. Todos os direitos reservados.</p>
        </Container>
      </Segment>
    </Container>
  );
};

export default SliderInfo;
