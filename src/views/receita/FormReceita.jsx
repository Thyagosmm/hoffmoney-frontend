import React, { useState, useEffect } from "react";
import { Form, Button, Dropdown } from "semantic-ui-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./FormReceita.css";
import { useNavigate } from 'react-router-dom';
import {
  registrarReceita,
  atualizarReceita,
  deletarReceita,
  buscarReceitaPorId,
} from "../../api/UserApi";
import Header from "../components/appMenu/AppMenu";

const FormReceita = ({ receitaId }) => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [recurrence, setRecurrence] = useState("");
  const [frequency, setFrequency] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userId, setUSerId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setUSerId(localStorage.getItem("userId"));
    if (receitaId) {
      const fetchReceita = async () => {
        try {
          const response = await buscarReceitaPorId(receitaId);
          const receita = response.data;
          setName(receita.nome);
          setValue(receita.valor);
          setCategory(receita.categoria);
          setRecurrence(receita.recorrente);
          setFrequency(receita.periodo);
          setDescription(receita.descricao);
          setDate(new Date(receita.dataDeCobranca));
        } catch (error) {
          console.error("Erro ao buscar a receita:", error);
          setError("Erro ao buscar a receita.");
        }
      };
      fetchReceita();
    }
  }, [receitaId]);

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

  const handleRegistrarReceita = async (e) => {
    e.preventDefault();
    const formattedDate = formatDate(date);

    try {
      const response = await registrarReceita({
        usuario: { id: userId },
        nome: name,
        descricao: description,
        valor: value,
        categoria: category,
        recorrente: recurrence,
        periodo: frequency,
        dataDeCobranca: formattedDate,
        paga: false,
      });
      console.log("Receita registrada:", response.data);
      setSuccess("Receita registrada com sucesso!");
      // Redirecionar ou limpar campos...
      navigate('/receitas');
    } catch (error) {
      console.error("Erro ao registrar a receita:", error);
      setError("Erro ao registrar a receita.");
    }
  };

  const handleAtualizarReceita = async (e) => {
    e.preventDefault();
    const formattedDate = formatDate(date);

    try {
      const response = await atualizarReceita(receitaId, {
        usuario: { id: 1 }, // Substituir pelo ID do usuário logado
        nome: name,
        descricao: description,
        valor: value,
        categoria: category,
        recorrente: recurrence,
        periodo: frequency,
        dataDeCobranca: formattedDate,
        paga: false,
      });
      console.log("Receita atualizada:", response.data);
      setSuccess("Receita atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar a receita:", error);
      setError("Erro ao atualizar a receita.");
    }
  };

  const handleDeletarReceita = async (e) => {
    e.preventDefault();
    try {
      await deletarReceita(receitaId);
      console.log("Receita deletada");
      setSuccess("Receita deletada com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar a receita:", error);
      setError("Erro ao deletar a receita.");
    }
  };

  return (
    <>
      <div className="container">
        <div>
          <Header />
        </div>
        <div className="receita">
          <div className="receita-form">
            <h1>Cadastro de Receita</h1>
            <div className="form-content">
              <div className="form-fields">
                <Form>
                  <Form.Field>
                    <label>Nome</label>
                    <input
                      className="input-field"
                      placeholder="Digite o nome da Receita"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Valor</label>
                    <input
                      className="input-field"
                      placeholder="Digite o valor da Receita"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
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
                      value={category}
                      onChange={(e, { value }) => setCategory(value)}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Recorrente</label>
                    <Dropdown
                      className="input-field"
                      placeholder="Selecione Recorrência"
                      fluid
                      selection
                      options={[
                        { key: true, text: "Sim", value: true },
                        { key: false, text: "Não", value: false },
                      ]}
                      value={recurrence}
                      onChange={(e, { value }) => setRecurrence(value)}
                    />
                  </Form.Field>
                  {recurrence === true && (
                    <>
                      <Form.Field>
                        <label>Frequência</label>
                        <Dropdown
                          className="input-field"
                          placeholder="Selecione Frequência"
                          fluid
                          selection
                          options={[
                            {
                              key: "diario",
                              text: "Diariamente",
                              value: "diario",
                            },
                            {
                              key: "semanal",
                              text: "Semanalmente",
                              value: "semanal",
                            },
                            {
                              key: "mensal",
                              text: "Mensalmente",
                              value: "mensal",
                            },
                            {
                              key: "anual",
                              text: "Anualmente",
                              value: "anual",
                            },
                          ]}
                          value={frequency}
                          onChange={(e, { value }) => setFrequency(value)}
                        />
                      </Form.Field>
                    </>
                  )}
                  <Form.Field>
                    <label>Descrição</label>
                    <input
                      className="input-field"
                      placeholder="Digite uma descrição para a receita"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Field>
                </Form>
              </div>
              <div className="calendar-container">
                <Calendar onChange={setDate} value={date} />
              </div>
            </div>
            <div className="save-button-container">
              {receitaId ? (
                <>
                  <Button
                    className="save-button"
                    onClick={handleAtualizarReceita}
                  >
                    Atualizar
                  </Button>
                  <Button
                    className="delete-button"
                    onClick={handleDeletarReceita}
                  >
                    Deletar
                  </Button>
                </>
              ) : (
                <Button
                  className="save-button"
                  onClick={handleRegistrarReceita}
                >
                  Salvar
                </Button>
              )}
            </div>
            {success && <div className="success-message">{success}</div>}
            {error && <div className="error-message">{error}</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default FormReceita;
