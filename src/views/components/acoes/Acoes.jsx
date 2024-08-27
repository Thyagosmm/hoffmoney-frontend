import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import "./Acoes.css";
const Acoes = () => {
  const [acoes, setAcoes] = useState({ altas: [], baixas: [] });
  //  const API_KEY = "CDA39VTLPGUDL3GD"; // Substitua pela sua chave da API
  const API_KEY = "ZOEWVNQO6AO0YQ50"; // Substitua pela sua chave da API
  // const API_KEY = "0Y2V5HXFKQA9TA85"; // Substitua pela sua chave da API

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const responseApi = await fetch(
          `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${API_KEY}`,
        );

        if (!responseApi.ok) {
          notifyError("Erro ao buscar dados das ações");
        }

        const data = await responseApi.json();

        setAcoes({
          altas: data.top_gainers,
          baixas: data.top_losers,
        });
        console.log("Dados das ações:", data);
      } catch (error) {
        console.error("Erro ao buscar dados das ações:", error);
      }
    };

    fetchStockData();
  }, []);
  // Limite o número de ações a 8
  const limitedAltas = acoes.altas.slice(0, 8);
  const limitedBaixas = acoes.baixas.slice(0, 8);

  // Divida as ações em pares para cada linha
  const altas = [];
  const baixas = [];
  for (let i = 0; i < limitedAltas.length; i += 2) {
    altas.push(limitedAltas.slice(i, i + 2));

    baixas.push(limitedBaixas.slice(i, i + 2));
  }

  return (
    <div className="acoes">
      <Grid className="lista-acoes">
        {altas.map((row, rowIndex) => (
          <Grid.Row className="acoes-linha" key={rowIndex}>
            {row.map((acao, colIndex) => (
              <Grid.Column className="altas-item" key={colIndex}>
                <div className="text-acao">{acao.ticker}</div>
                <div className="text-acao">{acao.price}</div>
                <div className="text-acao">{acao.change_percentage}</div>
              </Grid.Column>
            ))}
          </Grid.Row>
        ))}
      </Grid>
      <Grid className="lista-acoes">
        {baixas.map((row, rowIndex) => (
          <Grid.Row className="acoes-linha" key={rowIndex}>
            {row.map((acao, colIndex) => (
              <Grid.Column className="baixas-item" key={colIndex}>
                <div className="text-acao">{acao.ticker}</div>
                <div className="text-acao">{acao.price}</div>
                <div className="text-acao">{acao.change_percentage}</div>
              </Grid.Column>
            ))}
          </Grid.Row>
        ))}
      </Grid>
    </div>
  );
};
export default Acoes;
