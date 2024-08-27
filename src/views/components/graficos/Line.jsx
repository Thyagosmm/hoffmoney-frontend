import React from "react";
import { Line as LineChart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrando os componentes necessários
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function Line() {
  const dataLine = {
    labels: ["jan", "fev", "mar", "abr", "mai", "jun", "jul"],
    datasets: [
      {
        label: "Receitas",
        data: [85, 69, 90, 91, 76, 91, 50],
        fill: true,
        borderColor: "rgb(125, 218, 88)",
        tension: 0.4,
      },
      {
        label: "Despesas",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true,
        borderColor: "rgb(210, 1, 3)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return "R$ " + value;
          },
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <LineChart data={dataLine} options={options} />
    </div>
  );
}

export default Line;
