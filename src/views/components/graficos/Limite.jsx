import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { listarDespesas } from "../../../api/UserApi";

Chart.register(ArcElement, Tooltip, Legend);

function Limite() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Despesas",
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listarDespesas();
        const despesas = response.data;

        // Filtrar despesas pagas
        const despesasPagas = despesas.filter((despesa) => despesa.paga);

        const categorias = despesasPagas.map((despesa) => despesa.categoria);
        const valores = despesasPagas.map((despesa) => despesa.valor);

        setChartData((prevData) => ({
          ...prevData,
          labels: categorias,
          datasets: [
            {
              ...prevData.datasets[0],
              data: valores,
            },
          ],
        }));
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

  return <Doughnut data={chartData} options={options} />;
}

export default Limite;
