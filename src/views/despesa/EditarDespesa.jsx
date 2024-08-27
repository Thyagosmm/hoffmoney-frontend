import React, { useState, useEffect } from "react";
import { Form, Button, Dropdown } from "semantic-ui-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./FormDespesa.css";
import { buscarDespesaPorId, atualizarDespesa } from "../../api/UserApi";
import Header from "../components/appMenu/AppMenu";
import { useParams, useNavigate } from "react-router-dom";

const EditarDespesa = () => {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState(new Date());
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const usuarioId = localStorage.getItem("userId");

  useEffect(() => {
    const carregarDespesa = async () => {
      try {
        const response = await buscarDespesaPorId(usuarioId, id);
        const despesaData = response.data;
        setNome(despesaData.nome);
        setValor(despesaData.valor);
        setCategoria(despesaData.categoria);
        setDescricao(despesaData.descricao);
        const dataDespesa = new Date(despesaData.dataDeCobranca);
        if (!isNaN(dataDespesa.getTime())) {
          setData(dataDespesa);
        } else {
          console.error("Data inválida:", despesaData.dataDeCobranca);
        }
      } catch (error) {
        console.error("Erro ao carregar a despesa", error);
        setError("Erro ao carregar a despesa.");
      }
    };

    carregarDespesa();
  }, [id, usuarioId]);

  const recOptions = [
    { key: "sim", text: "Sim", value: true },
    { key: "nao", text: "Não", value: false },
  ];

  const freqOptions = [
    { key: "diario", text: "Diariamente", value: "diario" },
    { key: "semanal", text: "Semanalmente", value: "semanal" },
    { key: "mensal", text: "Mensalmente", value: "mensal" },
    { key: "anual", text: "Anualmente", value: "anual" },
  ];

  const categoryOptions = [
    { key: "Alimentação", text: "Alimentação", value: "Alimentação" },
    { key: "Transporte", text: "Transporte", value: "Transporte" },
    { key: "Aluguel", text: "Aluguel", value: "Aluguel" },
    { key: "Utilidades", text: "Utilidades", value: "Utilidades" },
    { key: "Entretenimento", text: "Entretenimento", value: "Entretenimento" },
    { key: "Outros", text: "Outros", value: "Outros" },
  ];

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = formatDate(data);
    try {
      await atualizarDespesa(usuarioId, id, {
        nome,
        valor,
        categoria,
        descricao,
        periodo: frequencia,
        dataDeCobranca: formattedDate,
      });
      setSuccess("Despesa atualizada com sucesso!");
      navigate("/despesas");
    } catch (error) {
      console.error("Erro ao atualizar a despesa", error);
      setError("Erro ao atualizar a despesa.");
    }
  };

  return (
    <>
      <div className="container">
        <Header />
        <div className="despesa">
          <div className="despesa-form">
            <h1>Editar Despesa</h1>
            <div className="form-content">
              <div className="form-fields">
                <Form onSubmit={handleSubmit}>
                  <Form.Field>
                    <label>Nome</label>
                    <input
                      className="input-field"
                      placeholder="Digite o nome da Despesa"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      required
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Valor</label>
                    <input
                      className="input-field"
                      type="number"
                      placeholder="Digite o valor da Despesa"
                      value={valor}
                      onChange={(e) => setValor(e.target.value)}
                      required
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Categoria</label>
                    <Dropdown
                      className="input-field"
                      placeholder="Selecione a Categoria"
                      fluid
                      selection
                      options={categoryOptions}
                      value={categoria}
                      onChange={(e, { value }) => setCategoria(value)}
                    />
                  </Form.Field>

                  <Form.Field>
                    <label>Descrição</label>
                    <input
                      className="input-field"
                      placeholder="Digite uma descrição para a despesa"
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                    />
                  </Form.Field>
                  <Button type="submit" className="form-button">
                    Salvar
                  </Button>
                </Form>
              </div>
              <div className="calendar-container">
                <Calendar onChange={setData} value={data} />
              </div>
            </div>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditarDespesa;
