import React, { useState, useEffect } from "react";
import { Form, Button, Dropdown, Radio, Input } from "semantic-ui-react";
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
    if (recurrence) {
      if (!frequency.trim()) {
        newErrors.frequency = "Por favor, insira a frequência.";
        notifyError("Por favor, insira a frequência.");
      }
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
          notifyError("Erro ao buscar a despesa.", error);
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
        setTimeout(() => {
          navigate("/despesas");
        }, 5000);
      } catch (error) {
        notifyError(mensagemErro);
      }
    } else {
      notifyError("Por favor, corrija os campos vermelhos no formulário.");
    }
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
        console.log("Despesa atualizada:", response.data);
      } catch (error) {
        notifyError(mensagemErro);
        console.error("Erro ao atualizar a despesa:", error);
      }
    } else {
      notifyError("Por favor, corrija os campos vermelhos no formulário.");
    }
  };
};

export default FormDespesa;