import React, { useEffect, useState } from "react";
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
import { listarDespesas, listarReceitas } from "../../../api/UserApi"; // Supondo que você tenha essas funções de API

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
  const [dataLine, setDataLine] = useState({
    labels: [],
    datasets: [
      {
        label: "Receitas",
        data: [],
        fill: true,
        borderColor: "rgb(125, 218, 88)",
        tension: 0.4,
      },
      {
        label: "Despesas",
        data: [],
        fill: true,
        borderColor: "rgb(210, 1, 3)",
        tension: 0.4,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [despesasResponse, receitasResponse] = await Promise.all([
          listarDespesas(),
          listarReceitas(),
        ]);

        const despesas = despesasResponse.data;
        const receitas = receitasResponse.data;

        // Função para formatar o mês
        const formatarMes = (mes) => {
          const meses = [
            "jan",
            "fev",
            "mar",
            "abr",
            "mai",
            "jun",
            "jul",
            "ago",
            "set",
            "out",
            "nov",
            "dez",
          ];
          return meses[mes];
        };

        // Agrupar despesas e receitas por mês
        const despesasPorMes = {};
        const receitasPorMes = {};

        despesas.forEach((despesa) => {
          console.log(despesa);
          const mes = new Date(despesa.dataDeCobranca).getMonth();
          const mesFormatado = formatarMes(mes);
          if (!despesasPorMes[mesFormatado]) {
            despesasPorMes[mesFormatado] = 0;
          }
          despesasPorMes[mesFormatado] += despesa.valor;
        });

        receitas.forEach((receita) => {
          const mes = new Date(receita.data).getMonth();
          const mesFormatado = formatarMes(mes);
          if (!receitasPorMes[mesFormatado]) {
            receitasPorMes[mesFormatado] = 0;
          }
          receitasPorMes[mesFormatado] += receita.valor;
        });

        // Gerar labels dinamicamente
        const labels = Array.from(
          new Set([
            ...Object.keys(despesasPorMes),
            ...Object.keys(receitasPorMes),
          ]),
        );

        // Ordenar labels
        labels.sort((a, b) => {
          const meses = [
            "jan",
            "fev",
            "mar",
            "abr",
            "mai",
            "jun",
            "jul",
            "ago",
            "set",
            "out",
            "nov",
            "dez",
          ];
          return meses.indexOf(a) - meses.indexOf(b);
        });

        // Gerar dados para o gráfico
        const somaDespesas = labels.map((label) => despesasPorMes[label] || 0);
        const somaReceitas = labels.map((label) => receitasPorMes[label] || 0);

        setDataLine({
          labels: labels,
          datasets: [
            {
              label: "Receitas",
              data: somaReceitas,
              fill: true,
              borderColor: "rgb(125, 218, 88)",
              tension: 0.4,
            },
            {
              label: "Despesas",
              data: somaDespesas,
              fill: true,
              borderColor: "rgb(210, 1, 3)",
              tension: 0.4,
            },
          ],
        });
      } catch (error) {
        console.error("Erro ao buscar dados de despesas e receitas", error);
      }
    };

    fetchData();
  }, []);

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

  return <LineChart data={dataLine} options={options} />;
}

export default Line;
