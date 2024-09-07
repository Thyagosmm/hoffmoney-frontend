import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import {
  listarDespesas,
  atualizarLimiteGastos,
  consultarLimiteGastos,
} from "../../../api/UserApi";
import "./Limite.css";
import { Button } from "semantic-ui-react";
import { Modal, Input, Header as SemanticHeader } from "semantic-ui-react";
import { notifyError, notifySuccess } from "../../utils/Utils";
import { set } from "date-fns";
Chart.register(ArcElement, Tooltip, Legend);

function Limite() {
  const [porcentagens, setPorcentagens] = useState([]);
  const [categoriasAgrupadas, setCategoriasAgrupadas] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [limite, setLimite] = useState(0);
  const [novoLimite, setNovoLimite] = useState();
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
  const atualizarLimite = async () => {
    try {
      const userId = localStorage.getItem("userId");
      await atualizarLimiteGastos(userId, novoLimite);
      notifySuccess("Limite de gastos atualizado com sucesso!");
      setModalOpen(false);
      setLimite(novoLimite);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Erro ao atualizar o limite de gastos", error);
      notifyError("Erro ao atualizar o limite de gastos.");
    }
  };
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
          0
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
          agrupadas[label].reduce((acc, categoria) => acc + categoria.valor, 0)
        );
        const totalDespesas = valores.reduce((acc, valor) => acc + valor, 0);
        const restanteDisponivel = limite - totalDespesas;

        const valoresComRestante = [...valores, restanteDisponivel];
        const labelsComRestante = [...labels, "Disponível"];
        const backgroundColorComRestante = [
          ...chartData.datasets[0].backgroundColor,
          "rgba(0, 255, 0, 0.37)", // Cor para o restante disponível
        ];
        const borderColorComRestante = [
          ...chartData.datasets[0].borderColor,
          "rgba(0, 255, 0, 0.2)", // Cor para o restante disponível
        ];
        const porcentagens = valores.map((valor) =>
          ((valor / limite) * 100).toFixed(2)
        );
        const porcentagemRestante = (
          (restanteDisponivel / limite) *
          100
        ).toFixed(2);
        const porcentagensComRestante = [...porcentagens, porcentagemRestante];
        setChartData((prevData) => ({
          ...prevData,
          labels: labelsComRestante,
          datasets: [
            {
              ...prevData.datasets[0],
              data: valoresComRestante,
              backgroundColor: backgroundColorComRestante,
              borderColor: borderColorComRestante,
            },
          ],
        }));
        setPorcentagens(porcentagensComRestante);
      } catch (error) {
        console.error("Erro ao buscar dados das despesas", error);
      }
    };
    const fetchLimite = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await consultarLimiteGastos(userId);
        console.log(response.data);
        setLimite(response.data);
      } catch (error) {
        console.error("Erro ao buscar limite de gastos", error);
      }
    };

    fetchLimite();
    fetchData();
  }, [limite]); // Adicionei `limite` como dependência para atualizar o gráfico quando o limite mudar

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
            <p>R$ {limite.toFixed(2)}</p>
            <Button className="form-button" onClick={() => setModalOpen(true)}>
              Editar
            </Button>
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

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        size="small"
        dimmer="blurring"
        closeIcon
      >
        <SemanticHeader icon="edit" content="Editar Limite de Gastos" />
        <Modal.Content>
          <Input
            fluid
            placeholder={`Limite atual: R$ ${limite}`}
            label={{ basic: true, content: "R$" }}
            labelPosition="left"
            type="number"
            value={novoLimite}
            onChange={(e) => setNovoLimite(parseFloat(e.target.value))}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setModalOpen(false)}>
            Cancelar
          </Button>
          <Button color="green" onClick={atualizarLimite}>
            Salvar
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default Limite;
