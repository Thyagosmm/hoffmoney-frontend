import React, { useState } from "react";
import { Form, Button, Dropdown } from "semantic-ui-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Certifique-se de instalar e importar o componente de calendário
import "./FormDespesa.css";
import { registrarDespesa } from "../../api/UserApi";
import Header from "../components/header/Header";

const FormDespesa = () => {
  const [name, setName] = useState("");
  const [value, setValue] = useState(""); // Valor da despesa
  const [category, setCategory] = useState("");
  const [recurrence, setRecurrence] = useState("");
  const [frequency, setFrequency] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    e.preventDefault();
    const formattedDate = formatDate(date);

    try {
      const response = await registrarDespesa({
        usuario: { id: 1 }, // Substituir pelo ID do usuário logado
        nome: name,
        descricao: description,
        valor: value,
        categoria: category,
        recorrente: recurrence,
        periodo: frequency,
        vezes: quantity,
        dataDeCobranca: formattedDate,
        paga: false,
      });
      console.log("Despesa registrada:", response.data);
      setSuccess("Despesa registrada com sucesso!");
      // Redirecionar ou limpar campos...
    } catch (error) {
      console.error("Erro ao registrar a despesa:", error);
      setError("Erro ao registrar a despesa.");
    }
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="despesa-container">
        <div className="despesa-form">
          <h1>Cadastro de Despesa</h1>
          <div className="form-content">
            <div className="form-fields">
              <Form>
                <Form.Field>
                  <label>Nome</label>
                  <input
                    placeholder="Digite o nome da Despesa"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Valor</label>
                  <input
                    placeholder="Digite o valor da Despesa"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Categoria</label>
                  <Dropdown
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
                          { key: "anual", text: "Anualmente", value: "anual" },
                        ]}
                        value={frequency}
                        onChange={(e, { value }) => setFrequency(value)}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Quantas vezes ela irá se repetir?</label>
                      <input
                        placeholder="Digite a quantidade de vezes que a despesa irá se repetir"
                        value={quantity}
                        fluid
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </Form.Field>
                  </>
                )}
                <Form.Field>
                  <label>Descrição</label>
                  <input
                    placeholder="Digite uma descrição para a despesa"
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
            <Button className="save-button" onClick={handleRegistrarDespesa}>
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormDespesa;
