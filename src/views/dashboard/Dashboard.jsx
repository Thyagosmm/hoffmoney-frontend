import React from "react";
import { Button, Container } from "semantic-ui-react";
import Limite from "../components/graficos/Limite";
import "./Dashboard.css"; // Importa o arquivo CSS
import Line from "../components/graficos/Line";

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

          <Container className="container-bordered"></Container>

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
