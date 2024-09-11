import React, { useState, useEffect } from "react";
import { Form, Button, Dropdown, Input, Modal, Icon } from "semantic-ui-react";
import { notifyError, notifySuccess, mensagemErro } from "../utils/Utils";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./FormDespesa.css";
import { NumericFormat } from "react-number-format";
import {
  registrarDespesa,
  deletarDespesa,
  atualizarDespesa,
  buscarDespesaPorId,
  listarCategoriasDespesa,
} from "../../api/UserApi";
import { useNavigate } from "react-router-dom";
import FormCategoriaDespesa from "../categorias/FormCategoriaDespesa"; // Importar o formulário de categoria de despesa

const FormDespesa = ({ despesaId }) => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [userId, setUserId] = useState("");
  const [idCategoriaDespesa, setIdCategoriaDespesa] = useState("");
  const [listaCategoriaDespesa, setListaCategoriaDespesa] = useState([]);
  const [errors, setErrors] = useState("");
  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar a visibilidade do modal

  const navigate = useNavigate();

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
    if (despesaId) {
      const fetchDespesa = async () => {
        try {
          const response = await buscarDespesaPorId(despesaId);
          const despesa = response.data;
          setName(despesa.nome);
          setValue(despesa.valor);
          setIdCategoriaDespesa(despesa.categoriaDespesa.id);
          setDescription(despesa.descricao);
          setDate(new Date(despesa.dataDeCobranca));
        } catch (error) {
          notifyError("Erro ao buscar a despesa.", error);
          console.error("Erro ao buscar a despesa:", error);
        }
      };
      fetchDespesa();
    }

    const fetchCategorias = async () => {
      try {
        const response = await listarCategoriasDespesa();
        const dropDownCategoriaDespesa = response.data.map((categoria) => ({
          key: categoria.id,
          text: categoria.descricaoCategoriaDespesa,
          value: categoria.id,
        }));
        setListaCategoriaDespesa(dropDownCategoriaDespesa);
        if (response.data.length === 0) {
          setModalOpen(true); // Abrir o modal se não houver categorias
        }
      } catch (error) {
        notifyError("Erro ao carregar categorias.", error);
      }
    };

    fetchCategorias();
  }, [despesaId]);

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
    if (!date || isNaN(date.getTime())) {
      notifyError("A data não pode ser nula ou indefinida.");
    }
    if (!idCategoriaDespesa) {
      newErrors.categoriaDespesa = "Por favor, selecione uma categoria.";
      notifyError("Por favor, selecione uma categoria.");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleRegistrarDespesa = async (e) => {
    if (validate()) {
      e.preventDefault();
      const formattedDate = formatDate(date);

      try {
        const response = await registrarDespesa({
          usuario: { id: userId },
          nome: name,
          descricao: description,
          valor: value,
          idCategoriaDespesa: idCategoriaDespesa,
          dataDeCobranca: formattedDate, // Envia a data formatada
          paga: false,
        });
        console.log("Despesa registrada:", response.data);
        notifySuccess("Despesa registrada com sucesso!");
        setTimeout(() => {
          navigate("/despesas");
        }, 1500);
      } catch (error) {
        notifyError(mensagemErro);
      }
    }
  };

  const handleAtualizarDespesa = async (e) => {
    if (validate()) {
      e.preventDefault();
      const formattedDate = formatDate(date);
      try {
        const response = await atualizarDespesa(despesaId, {
          usuario: { id: userId },
          nome: name,
          descricao: description,
          valor: value,
          idCategoriaDespesa: idCategoriaDespesa,
          dataDeCobranca: formattedDate,
          paga: false,
        });
        notifySuccess("Despesa atualizada com sucesso!");
        console.log("Despesa atualizada:", response.data);
      } catch (error) {
        notifyError(mensagemErro);
        console.error("Erro ao atualizar a despesa:", error);
      }
    }
  };

  const handleDeletarDespesa = async (e) => {
    e.preventDefault();
    try {
      await deletarDespesa(despesaId);
      console.log("Despesa deletada");
      notifySuccess("Despesa deletada com sucesso!");
      setTimeout(() => {
        navigate("/despesas");
      }, 1500);
    } catch (error) {
      console.error("Erro ao deletar a despesa:", error);
      notifyError("Erro ao deletar a despesa.");
    }
  };

  return (
    <>
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
                </Form.Field>
                <Form.Field
                  className="dropCategoriaDespesa"
                  error={!!errors.idCategoriaDespesa}
                >
                  <label>Categoria</label>
                  <Dropdown
                    className="input-field"
                    placeholder="Selecione"
                    fluid
                    selection
                    options={listaCategoriaDespesa}
                    value={idCategoriaDespesa}
                    onChange={(e, { value }) => setIdCategoriaDespesa(value)}
                  />
                </Form.Field>

                <Form.Field error={!!errors.description}>
                  <label>Descrição</label>
                  <input
                    className="input-field"
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
            {despesaId ? (
              <>
                <Button
                  className="form-button"
                  onClick={handleAtualizarDespesa}
                >
                  Atualizar
                </Button>
                <Button className="form-button" onClick={handleDeletarDespesa}>
                  Deletar
                </Button>
              </>
            ) : (
              <Button className="form-button" onClick={handleRegistrarDespesa}>
                Salvar
              </Button>
            )}
          </div>
        </div>
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} size="small">
        <Modal.Header>
          <div>
            Por favor crie uma categoria para sua Despesa{" "}
            <Icon color="red" name="warning sign" />
          </div>
        </Modal.Header>
        <Modal.Content inverted>
          <FormCategoriaDespesa />
        </Modal.Content>
        <Modal.Actions>
          <span>
            <Icon name="info circle" />
            Você pode gerenciar suas categorias no menu Categorias
          </span>
          <Button onClick={() => setModalOpen(false)}>Fechar</Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default FormDespesa;
