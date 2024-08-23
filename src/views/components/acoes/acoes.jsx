import React, { useEffect, useState } from 'react';
import yahooFinance from 'yahoo-finance2';

const Acoes = () => {
  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        // Obter os maiores ganhadores do dia
        const gainers = await yahooFinance.dailyGainers('BR');
        setTopGainers(gainers.slice(0, 5));

        // Obter os maiores perdedores do dia
        const losers = await yahooFinance.trendingSymbols('US', { direction: 'losers' });
        setTopLosers(losers.slice(0, 5));
      } catch (error) {
        console.error('Erro ao buscar dados das ações:', error);
      }
    };

    fetchStockData();
  }, []);

  return (
    <div>
      <h1>Ações de Maior Alta e Baixa do Dia</h1>
      <h2>Top 5 Altas</h2>
      {topGainers.length > 0 ? (
        <ul>
          {topGainers.map(stock => (
            <li key={stock.symbol}>{stock.symbol}: {stock.regularMarketChangePercent.toFixed(2)}%</li>
          ))}
        </ul>
      ) : (
        <p>Carregando...</p>
      )}
      <h2>Top 5 Baixas</h2>
      {topLosers.length > 0 ? (
        <ul>
          {topLosers.map(stock => (
            <li key={stock.symbol}>{stock.symbol}: {stock.regularMarketChangePercent.toFixed(2)}%</li>
          ))}
        </ul>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default Acoes;