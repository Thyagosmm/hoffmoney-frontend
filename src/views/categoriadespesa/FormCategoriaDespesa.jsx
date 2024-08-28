import React, { useState, useEffect } from "react";
import { Form, Button, Input } from "semantic-ui-react";
import { notifyError, notifySuccess } from "../utils/Utils";
import { registrarCategoriaDespesa, buscarCategoriaPorId } from "../../api/UserApi";
import AppMenu from "../components/appMenu/AppMenu";
import { useNavigate } from "react-router-dom";
import "./FormCategoriaDespesa.css";

const FormCategoriaDespesa = ({ categoriaId }) => {
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (categoriaId) {
      const fetchCategoria = async () => {
        try {
          const response = await buscarCategoriaPorId(categoriaId);
          const categoria = response.data;
          setDescription(categoria.descricao);
        } catch (error) {
          notifyError("Erro ao buscar a categoria de despesa.", error);
          console.error("Erro ao buscar a categoria de despesa:", error);
        }
      };
      fetchCategoria();
    }
  }, [categoriaId]);

  const validate = () => {
    const newErrors = {};
    if (!description.trim()) {
      newErrors.description = "Por favor, insira a descrição.";
      notifyError("Por favor, insira a descrição.");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegistrarCategoria = async (e) => {
    if (validate()) {
      e.preventDefault();
      try {
        const response = await registrarCategoriaDespesa({
          descricao: description,
        });
        console.log("Categoria registrada:", response.data);
        notifySuccess("Categoria registrada com sucesso!");
        setTimeout(() => {
          navigate("/categorias-despesas");
        }, 3000);
      } catch (error) {
        notifyError("Erro ao registrar a categoria de despesa.");
        console.error("Erro ao registrar a categoria de despesa:", error);
      }
    }
  };

  return (
    <>
      <AppMenu />
      <div className="categoria-despesa">
        <div className="categoria-despesa-form">
          <h1>Cadastro de Categoria de Despesa</h1>
          <Form>
            <Form.Field error={!!errors.description}>
              <label>Descrição</label>
              <Input
                className="input-field"
                placeholder="Digite a descrição da Categoria"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Field>
            <Button className="form-button" onClick={handleRegistrarCategoria}>
              Salvar
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default FormCategoriaDespesa;
