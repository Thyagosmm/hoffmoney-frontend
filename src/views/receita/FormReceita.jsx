import React, { useState, useEffect } from "react";
import { Form, Button, Dropdown, Radio} from "semantic-ui-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./FormReceita.css";
import {
  registrarReceita,
  atualizarReceita,
  deletarReceita,
  buscarReceitaPorId,
} from "../../api/UserApi";
import Header from "../components/appMenu/AppMenu";
import { notifyError, notifySuccess, mensagemErro } from "../utils/Utils";
import { useNavigate } from "react-router-dom";

const FormReceita = ({ receitaId }) => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [recurrence, setRecurrence] = useState("");
  const [frequency, setFrequency] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [errors, setErrors] = useState("");
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
          setFrequency(receita.periodo);
          setDescription(receita.descricao);
          setDate(new Date(receita.dataDeCobranca));
        } catch (errors) {
          console.error("Erro ao buscar a receita:", errors);
          setErrors("Erro ao buscar a receita.");
        }
      };
      fetchReceita();
    }
  }, [receitaId]);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Informe o nome da receita.";
      notifyError("Informe o nome da receita.");
    }
    if (!value.trim()) {
      newErrors.value = "Informe o valor da receita.";
      notifyError("Informe o valor da receita.");
    }
    if (recurrence) {
      if (!frequency.trim()) {
        newErrors.frequency = "Informe a freqência da receita.";
        notifyError("Informe a freqência da receita.");
      }
    }
    if (date == null) {
      notifyError("A data não pode ser nula ou indefinida.");
    }
    if (!category.trim()) {
      newErrors.category = "Informe a categoria da receita.";
      notifyError("Informe a categoria da receita.");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const categoryOptions = [
    { key: "Salario", text: "Salário", value: "Salario" },
    { key: "Honorarios", text: "Honorários", value: "Honorarios" },
    { key: "Comissoes", text: "Comissões", value: "Comissoes" },
    { key: "Juros", text: "Juros", value: "Juros" },
    { key: "Dividendos", text: "Dividendos", value: "Dividendos" },
    { key: "Outros", text: "Outros", value: "Outros" },
  ];

  const freqOptions = [
    { key: "diario", text: "Diariamente", value: "diario" },
    { key: "semanal", text: "Semanalmente", value: "semanal" },
    { key: "mensal", text: "Mensalmente", value: "mensal" },
    { key: "anual", text: "Anualmente", value: "anual" },
  ];

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleRegistrarReceita = async (e) => {
    if (validate()) {
      e.preventDefault();
      const formattedDate = formatDate(date);

      try {
        const response = await registrarReceita({
          usuario: { id: userId },
          nome: name,
          descricao: description,
          valor: value,
          categoria: category,
          periodo: frequency,
          dataDeCobranca: formattedDate,
          paga: false,
        });
        console.log("Receita registrada:", response.data);
        notifySuccess("Receita registrada com sucesso!");
        setTimeout(() => {
          navigate("/receitas");
        }, 3000);
      } catch (error) {
        notifyError(mensagemErro);
      }
    } else {
      notifyError("Preencha os campos necessários no formulário.");
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