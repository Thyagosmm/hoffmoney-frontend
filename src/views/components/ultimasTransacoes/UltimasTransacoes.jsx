import React, { useEffect, useState } from "react";
import { Tab, Table, TabPane } from "semantic-ui-react";
import { listarDespesas, listarReceitas } from "../../../api/UserApi"; // Supondo que você tenha essas funções de API

const UltimasTransacoes = () => {
  const [ultimasDespesas, setUltimasDespesas] = useState([]);
  const [ultimasReceitas, setUltimasReceitas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [despesasResponse, receitasResponse] = await Promise.all([
          listarDespesas(),
          listarReceitas(),
        ]);

        const despesas = despesasResponse.data;
        const receitas = receitasResponse.data;

        // Ordenar receitas e despesas pela data de cobrança
        const despesasOrdenadas = [...despesas].sort(
          (a, b) => new Date(b.dataDeCobranca) - new Date(a.dataDeCobranca),
        );
        const receitasOrdenadas = [...receitas].sort(
          (a, b) => new Date(b.dataDeCobranca) - new Date(a.dataDeCobranca),
        );

        // Selecionar as 5 últimas receitas e despesas
        setUltimasDespesas(despesasOrdenadas.slice(0, 5));
        setUltimasReceitas(receitasOrdenadas.slice(0, 5));
      } catch (error) {
        console.error("Erro ao buscar dados de despesas e receitas", error);
      }
    };

    fetchData();
  }, []);

  const panes = [
    {
      menuItem: "Últimas Despesas",
      render: () => (
        <TabPane
          inverted
          style={{
            border: "2px solid red",
            borderRadius: "1rem",
            height: "max-content",
            padding: "0",
            margin: "0",
          }}
        >
          <Table inverted style={{ borderRadius: "1rem" }} celled>
            <Table.Body>
              {ultimasDespesas.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan="3">
                    Nenhuma despesa encontrada
                  </Table.Cell>
                </Table.Row>
              ) : (
                ultimasDespesas.map((despesa) => (
                  <Table.Row className="linha-transacoes" key={despesa.id}>
                    <Table.Cell className="celulas-table">
                      {despesa.nome}
                    </Table.Cell>
                    <Table.Cell className="celulas-table">
                      R$ {despesa.valor}
                    </Table.Cell>
                    <Table.Cell className="celulas-table">
                      {despesa.dataDeCobranca}
                    </Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table>
        </TabPane>
      ),
    },
    {
      menuItem: "Últimas Receitas",
      render: () => (
        <TabPane
          inverted
          style={{
            border: "2px solid green",
            borderRadius: "1rem",
            padding: "0",
            margin: "0",
          }}
        >
          <Table inverted style={{ borderRadius: "1rem" }} celled>
            <Table.Body>
              {ultimasReceitas.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan="3">
                    Nenhuma receita encontrada
                  </Table.Cell>
                </Table.Row>
              ) : (
                ultimasReceitas.map((receita) => (
                  <Table.Row className="linha-transacoes" key={receita.id}>
                    <Table.Cell className="celulas-table">
                      {receita.nome}
                    </Table.Cell>
                    <Table.Cell className="celulas-table">
                      R$ {receita.valor}
                    </Table.Cell>
                    <Table.Cell className="celulas-table">
                      {receita.dataDeCobranca}
                    </Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table>
        </TabPane>
      ),
    },
  ];

  return (
    <div className="ultimas-container">
      <Tab menu={{ attached: true, tabular: false }} panes={panes} />
    </div>
  );
};

export default UltimasTransacoes;
