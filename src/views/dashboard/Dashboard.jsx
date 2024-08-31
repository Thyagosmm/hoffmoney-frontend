import React from "react";
import { Container } from "semantic-ui-react";
import AcoesPreenchidas from "../components/acoes/AcoesPreenchidas";

import Limite from "../components/graficos/Limite";
import Line from "../components/graficos/Line";
import "./Dashboard.css"; // Importa o arquivo CSS
import Acoes from "../components/acoes/Acoes";

const Dashboard = () => {
  return (
    <>
      <div className="dashboard-container">
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
