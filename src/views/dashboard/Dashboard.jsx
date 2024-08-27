import React from "react";
import { Button, Container } from "semantic-ui-react";
import Acoes from "../components/acoes/Acoes";
import AcoesPreenchidas from "../components/acoes/AcoesPreenchidas";

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
          </Container>

          <Container className="container-bordered acoes-container">
            <h3>Ações</h3>

            <AcoesPreenchidas />
          </Container>
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
