import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { listarDespesas } from "../../../api/UserApi";
import "./Limite.css";
import { Button } from "semantic-ui-react";

Chart.register(ArcElement, Tooltip, Legend);

function Limite() {
  const [porcentagens, setPorcentagens] = useState([]);
  const [categoriasAgrupadas, setCategoriasAgrupadas] = useState({});

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const agruparCategorias = (categorias) => {
    return categorias.reduce((acc, categoria) => {
      const { descricao } = categoria;
      if (!acc[descricao]) {
        acc[descricao] = [];
      }
      acc[descricao].push(categoria);
      return acc;
    }, {});
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listarDespesas();
        const despesas = response.data;

        // Filtrar despesas pagas
        const despesasPagas = despesas.filter((despesa) => despesa.paga);

        const total = despesasPagas.reduce(
          (acc, despesa) => acc + despesa.valor,
          0,
        );

        // Agrupar categorias
        const categorias = despesasPagas.map((despesa) => ({
          descricao: despesa.categoriaDespesa.descricaoCategoriaDespesa,
          valor: despesa.valor,
        }));

        const agrupadas = agruparCategorias(categorias);
        setCategoriasAgrupadas(agrupadas);

        // Calcular valores e porcentagens
        const labels = Object.keys(agrupadas);
        const valores = labels.map((label) =>
          agrupadas[label].reduce((acc, categoria) => acc + categoria.valor, 0),
        );
        const porcentagens = valores.map((valor) =>
          ((valor / total) * 100).toFixed(2),
        );

        setChartData((prevData) => ({
          ...prevData,
          labels: labels,
          datasets: [
            {
              ...prevData.datasets[0],
              data: valores,
            },
          ],
        }));
        setPorcentagens(porcentagens);
      } catch (error) {
        console.error("Erro ao buscar dados das despesas", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    borderRadius: 7,
    spacing: 10,
    responsive: true,
    maintainAspectRatio: true,
    cutout: "85%", // Isso permite que o gráfico se estique para preencher a div
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="limite-container">
      <div className="chart-container">
        <div className="chart-wrapper">
          <Doughnut data={chartData} options={options} />
          <div className="limite">
            <p>Limite de Gastos</p>
            <p>R$ 1.500,00</p>
            <Button className="form-button">Editar</Button>
          </div>
        </div>
      </div>
      <div className="categories-list">
        {chartData.labels.map((label, index) => (
          <div
            key={index}
            className="category-item"
            style={{ borderColor: chartData.datasets[0].borderColor[index] }}
          >
            <h5 className="category-label">{label}</h5>
            <h5 className="category-percentage">{porcentagens[index]}%</h5>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Limite;