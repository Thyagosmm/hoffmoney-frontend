import React, { useEffect, useState } from "react";
import "./Acoes.css";
const Acoes = () => {
  const [acoes, setAcoes] = useState({ altas: [], baixas: [] });
  //  const API_KEY = "CDA39VTLPGUDL3GD"; // Substitua pela sua chave da API
  // const API_KEY = "ZOEWVNQO6AO0YQ50"; // Substitua pela sua chave da API
  const API_KEY = "0Y2V5HXFKQA9TA85"; // Substitua pela sua chave da API

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const responseAltas = await fetch(
          `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${API_KEY}`,
        );
        const responseBaixas = await fetch(
          `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${API_KEY}`,
        );

        if (!responseAltas.ok || !responseBaixas.ok) {
          throw new Error("Erro ao buscar dados das ações");
        }

        const dataAltas = await responseAltas.json();
        const dataBaixas = await responseBaixas.json();

        setAcoes({
          altas: dataAltas.top_gainers,
          baixas: dataBaixas.top_losers,
        });
        console.log("Dados das ações:", dataAltas, dataBaixas);
      } catch (error) {
        console.error("Erro ao buscar dados das ações:", error);
      }
    };

    fetchStockData();
  }, []);

  return (
    <div className="acoes">
      <div>
        <h2>Altas</h2>
        <table className="altas-table">
          <tbody>
            {Array.isArray(acoes.altas)
              ? acoes.altas.slice(0, 5).map((acao, index) => (
                  <tr key={index}>
                    <td>
                      <div>Simbolo{acao.symbol}</div>
                    </td>
                    <td>
                      <div>Nome{acao.name}</div>
                    </td>
                    <td>
                      <div>Preço{acao.price}</div>
                    </td>
                    <td>
                      <div>Mudança{acao.change}</div>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Baixas</h2>
        <table className="baixas-table">
          <tbody>
            {Array.isArray(acoes.baixas)
              ? acoes.baixas.slice(0, 5).map((acao, index) => (
                  <tr key={index}>
                    <td>
                      <div>{acao.symbol}</div>
                    </td>
                    <td>
                      <div>{acao.name}</div>
                    </td>
                    <td>
                      <div>{acao.price}</div>
                    </td>
                    <td>
                      <div>{acao.change}</div>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Acoes;
