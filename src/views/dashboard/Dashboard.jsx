import React from "react";
import { Button, Container } from "semantic-ui-react";
import Acoes from "../components/acoes/Acoes";
import Limite from "../components/graficos/Limite";
import Line from "../components/graficos/Line";
import "./Dashboard.css"; // Importa o arquivo CSS

const Dashboard = () => {
  return (
    <>
      <div className="dashboard-container">
        <h1>Dashboard</h1>
        <Container className="container-group">
          <Container className="container-bordered">
            <Limite />
            <div className="limite">
              <p>Limite de Gastos</p>
              <p>R$ 1.500,00</p>
              <Button className="form-button">Editar</Button>
            </div>
          </Container>

          <Container className="container-bordered">
            <h2>Ações</h2>
            <div>
              <Acoes />
            </div>
          </Container>

          <Container className="container-bordered"></Container>
        </Container>
        <Container className="container-group">
          <Container className="container-bordered">
            <Line />
          </Container>
        </Container>
      </div>
    </>
  );
};

export default Dashboard;
