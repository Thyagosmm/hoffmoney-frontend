import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Dropdown,
  Radio,
  Dimmer,
  Input,
} from "semantic-ui-react";
import { notifyError, notifySuccess, mensagemErro } from "../utils/Utils";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./FormDespesa.css";
import { NumericFormat } from "react-number-format";
import {
  registrarDespesa,
  atualizarDespesa,
  buscarDespesaPorId,
} from "../../api/UserApi";
import Header from "../components/appMenu/AppMenu";

const FormDespesa = ({ despesaId }) => {
  const [name, setName] = useState("");
  const [value, setValue] = useState(""); // Valor da despesa
  const [recurrence, setRecurrence] = useState("");
  const [frequency, setFrequency] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [userId, setUSerId] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [errors, setErrors] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [active, setActive] = useState(false);

  const handleOpen = () => setActive(true);
  const handleClose = () => setActive(false);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Por favor, insira o nome.";
      notifyError("Por favor, insira o nome.");
    }
    if (!value.trim()) {
      newErrors.value = "Por favor, insira o valor.";
      notifyError("Por favor, insira o valor.");
    }
    if (!recurrence.trim()) {
      newErrors.recurrence = "Por favor, insira a recorrência.";
      notifyError("Por favor, insira a recorrência.");
    }
    if (!frequency.trim()) {
      newErrors.frequency = "Por favor, insira a frequência.";
      notifyError("Por favor, insira a frequência.");
    }
    if (!description.trim()) {
      newErrors.description = "Por favor, insira a descrição.";
      notifyError("Por favor, insira a descrição.");
    }
    if (date == null) {
      notifyError("A data não pode ser nula ou indefinida.");
    }
    if (!category.trim()) {
      newErrors.category = "Por favor, insira a categoria.";
      notifyError("Por favor, insira a categoria.");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  useEffect(() => {
    setUSerId(localStorage.getItem("userId"));
    if (despesaId) {
      const fetchDespesa = async () => {
        try {
          const response = await buscarDespesaPorId(despesaId);
          const despesa = response.data;
          setName(despesa.nome);
          setValue(despesa.valor);
          setCategory(despesa.categoria);
          setRecurrence(despesa.recorrente);
          setFrequency(despesa.periodo);
          setDescription(despesa.descricao);
          setDate(new Date(despesa.dataDeCobranca));
        } catch (error) {
          handleOpen();
          setError("Erro ao buscar a despesa.", error);
          console.error("Erro ao buscar a despesa:", error);
        }
      };
      fetchDespesa();
    }
  }, [despesaId]);

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

  const handleRegistrarDespesa = async (e) => {
    if (validate()) {
      if (category === "Outros") {
        setCategory(newCategory);
      }
      e.preventDefault();
      const formattedDate = formatDate(date);

      try {
        const response = await registrarDespesa({
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
        console.log("Despesa registrada:", response.data);
        notifySuccess("Despesa registrada com sucesso!");
      } catch (error) {
        notifyError(mensagemErro);
      }
    } else {
      notifyError("Por favor, corrija os campos vermelhos no formulário.");
    }
  };

  const handleDeletarDespesa = () => {
    // Lógica para deletar a despesa
    setSuccess("Despesa deletada com sucesso!");
    setError("");
  };

  const handleAtualizarDespesa = async (e) => {
    if (validate()) {
      e.preventDefault();
      const formattedDate = formatDate(date);
      if (category === "Outros") {
        setCategory(newCategory);
      }
      try {
        const response = await atualizarDespesa(despesaId, {
          usuario: { id: userId }, // Substituir pelo ID do usuário logado
          nome: name,
          descricao: description,
          valor: value,
          categoria: category,
          recorrente: recurrence,
          periodo: frequency,
          dataDeCobranca: formattedDate,
          paga: false,
        });
        notifySuccess("Despesa atualizada com sucesso!");
      } catch (error) {
        notifyError(mensagemErro);
      }
    } else {
      setSuccess("");
      notifyError("Por favor, corrija os campos vermelhos no formulário.");
    }
  };

  return (
    <>
      <div className="container">
        <div>
          <Header />
        </div>
        <div className="despesa">
          <div className="despesa-form">
            <h1>Cadastro de Despesa</h1>
            <div className="form-content">
              <div className="form-fields">
                <Form>
                  <Form.Field error={!!errors.name}>
                    <label>Nome</label>
                    <input
                      className="input-field"
                      placeholder="Digite o nome da Despesa"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <Dimmer error content={errors.name} />}
                  </Form.Field>
                  <Form.Field error={!!errors.value}>
                    <label>Valor</label>
                    <NumericFormat
                      customInput={Input}
                      placeholder="Valor"
                      value={value}
                      onValueChange={(values) => setValue(values.value)}
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix="R$ "
                      decimalScale={2}
                      fixedDecimalScale={true}
                    />
                    {errors.value && <Dimmer error content={errors.value} />}
                  </Form.Field>
                  <Form.Field error={!!errors.category}>
                    <label>Categoria</label>
                    <Dropdown
                      className="input-field"
                      placeholder="Selecione Categoria"
                      fluid
                      selection
                      options={categoryOptions}
                      value={category}
                      onChange={(e, { value }) => setCategory(value)}
                    />
                    {errors.category && (
                      <Dimmer error content={errors.category} />
                    )}
                  </Form.Field>
                  {category === "Outros" && (
                    <Form.Field error={!!errors.newCategory}>
                      <label>Nova Categoria</label>
                      <input
                        className="input-field"
                        placeholder="Digite o nome da nova categoria"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                      />
                      {errors.newCategory && (
                        <Dimmer error content={errors.newCategory} />
                      )}
                    </Form.Field>
                  )}
                  <Form.Group className="grupoRecorrente">
                    <Form.Field className="custom-radio">
                      <label>Recorrente</label>
                      <Radio
                        toggle
                        label={recurrence ? "Sim" : "Não"}
                        checked={recurrence}
                        onChange={() => setRecurrence(!recurrence)}
                      />
                    </Form.Field>
                    {recurrence === true && (
                      <>
                        <Form.Field
                          fluid
                          className="dropdownFrequencia"
                          error={!!errors.frequency}
                        >
                          <Dropdown
                            className="input-field dropdownFrequencia"
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
                          {errors.frequency && (
                            <Dimmer error content={errors.frequency} />
                          )}
                        </Form.Field>
                      </>
                    )}
                  </Form.Group>
                  <Form.Field error={!!errors.description}>
                    <label>Descrição</label>
                    <input
                      className="input-field"
                      placeholder="Digite uma descrição para a despesa"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && (
                      <Dimmer error content={errors.description} />
                    )}
                  </Form.Field>
                </Form>
              </div>
              <div className="calendar-container">
                <Calendar onChange={setDate} value={date} />
              </div>
            </div>
            <div className="save-button-container">
              {despesaId ? (
                <>
                  <Button
                    className="save-button"
                    onClick={handleAtualizarDespesa}
                  >
                    Atualizar
                  </Button>
                  <Button
                    className="delete-button"
                    onClick={handleDeletarDespesa}
                  >
                    Deletar
                  </Button>
                </>
              ) : (
                <Button
                  className="save-button"
                  onClick={handleRegistrarDespesa}
                >
                  Salvar
                </Button>
              )}
            </div>
            {success && (
              <Dimmer active={active} onClickOutside={handleClose} page>
                {success}
              </Dimmer>
            )}
            {error && (
              <Dimmer active={active} onClickOutside={handleClose} page>
                {error}
              </Dimmer>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FormDespesa;