import React, { useState, useEffect } from "react";
import { Form, Button, Dropdown, Input } from "semantic-ui-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./FormReceita.css";
import { NumericFormat } from "react-number-format";
import {
  registrarReceita,
  atualizarReceita,
  deletarReceita,
  buscarReceitaPorId,
  listarCategoriasReceita,
} from "../../api/UserApi";
import AppMenu from "../components/appMenu/AppMenu";
import { notifyError, notifySuccess, mensagemErro } from "../utils/Utils";
import { useNavigate } from "react-router-dom";

const FormReceita = ({ receitaId }) => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [userId, setUserId] = useState("");
  const [idCategoriaReceita, setIdCategoriaReceita] = useState("");
  const [listaCategoriaReceita, setlistaCategoriaReceita] = useState([]);
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));

    const fetchReceita = async () => {
      if (receitaId) {
        try {
          const userId = localStorage.getItem("userId");
          const response = await buscarReceitaPorId(userId, receitaId);
          const receita = response.data;
          setName(receita.nome);
          setValue(receita.valor);
          setIdCategoriaReceita(receita.categoriaReceita.id);
          setDescription(receita.descricao);
          setDate(new Date(receita.dataDeCobranca));
        } catch (error) {
          notifyError("Erro ao buscar a receita.", error);
          console.error("Erro ao buscar a receita:", error);
        }
      }
    };


    const fetchCategorias = async () => {
      try {
        const response = await listarCategoriasReceita();
        const dropDownCategoriaReceita = response.data.map((cat) => ({
          key: cat.id,
          text: cat.descricaoCategoriaReceita,
          value: cat.id,
        }));
        setlistaCategoriaReceita(dropDownCategoriaReceita);
      } catch (error) {
        notifyError("Erro ao carregar categorias.", error);
      }
    };

    fetchReceita();
    fetchCategorias();
  }, [receitaId]);

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
    if (!idCategoriaReceita) {
      newErrors.categoriaReceita = "Por favor, selecione uma categoria.";
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
          idCategoriaReceita: idCategoriaReceita,
          dataDeCobranca: formattedDate,
          paga: false,
        });
        console.log("Receita registrada:", response.data);
        notifySuccess("Receita registrada com sucesso!");
        setTimeout(() => {
          navigate("/receitas");
        }, 1500);
      } catch (error) {
        notifyError(mensagemErro);
      }
    }
  };

  const handleAtualizarReceita = async (e) => {
    if (validate()) {
      e.preventDefault();
      const formattedDate = formatDate(date);
      try {
        const response = await atualizarReceita(receitaId, {
          usuario: { id: userId },
          nome: name,
          descricao: description,
          valor: value,
          idCategoriaReceita: idCategoriaReceita,
          dataDeCobranca: formattedDate,
          paga: false,
        });
        notifySuccess("Receita atualizada com sucesso!");
        console.log("Receita atualizada:", response.data);
      } catch (error) {
        notifyError(mensagemErro);
        console.error("Erro ao atualizar a receita:", error);
      }
    }
  };

  const handleDeletarReceita = async (e) => {
    e.preventDefault();
    try {
      await deletarReceita(receitaId);
      notifySuccess("Receita deletada com sucesso!");
      setTimeout(() => {
        navigate("/receitas");
      }, 1500);
    } catch (error) {
      notifyError("Erro ao deletar a receita.", error);
      console.error("Erro ao deletar a receita:", error);
    }
  };

  return (
    <>
      <AppMenu />
      <div className="receita">
        <div className="receita-form">
          <h1>Cadastro de Receita</h1>
          <div className="form-content">
            <div className="form-fields">
              <Form>
                <Form.Field error={!!errors.name}>
                  <label>Nome</label>
                  <input
                    className="input-field"
                    placeholder="Digite o nome da Receita"
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
                <Form.Field className="dropCategoriaReceita" error={!!errors.idCategoriaReceita}>
                  <label>Categoria</label>
                  <Dropdown
                    className="input-field"
                    placeholder="Selecione"
                    fluid
                    selection
                    options={listaCategoriaReceita}
                    value={idCategoriaReceita}
                    onChange={(e, { value }) => setIdCategoriaReceita(value)}
                  />
                </Form.Field>

                <Form.Field error={!!errors.description}>
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
                  className="form-button"
                  onClick={handleAtualizarReceita}
                >
                  Atualizar
                </Button>
                <Button className="form-button" onClick={handleDeletarReceita}>
                  Deletar
                </Button>
              </>
            ) : (
              <Button className="form-button" onClick={handleRegistrarReceita}>
                Salvar
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FormReceita;
