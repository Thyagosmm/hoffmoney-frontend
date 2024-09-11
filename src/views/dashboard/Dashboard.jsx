import React from "react";
import { Container } from "semantic-ui-react";
import AcoesPreenchidas from "../components/acoes/AcoesPreenchidas";

import Limite from "../components/graficos/Limite";
import Line from "../components/graficos/Line";
import "./Dashboard.css"; // Importa o arquivo CSS
import Acoes from "../components/acoes/Acoes";
import UltimasTransacoes from "../components/ultimasTransacoes/UltimasTransacoes";

const Dashboard = () => {
  localStorage.setItem("primeiroAcesso", true);
  return (
    <div className="page-div">
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
          <Container className="container-bordered linha-grafico">
            <Container className="linha-container">
              <h3>Histórico de Despesas e Receitas</h3>
              <Line />
            </Container>
            <div className="transacoes-div">
              <UltimasTransacoes />
            </div>
          </Container>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
