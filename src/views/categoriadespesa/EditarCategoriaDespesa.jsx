import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, Message } from "semantic-ui-react";
import { buscarCategoriaDespesaPorId, atualizarCategoriaDespesa } from "../../api/UserApi";
import AppMenu from "../components/appMenu/AppMenu";
import { notifyError, notifySuccess } from "../utils/Utils";
import "./FormCategoriaDespesa.css";

const EditarCategoriaDespesa = () => {
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const usuarioId = localStorage.getItem("userId");

  useEffect(() => {
    const carregarCategoria = async () => {
      try {
        const response = await buscarCategoriaDespesaPorId(id); 
        const categoriaData = response.data;
        setDescription(categoriaData.descricaoCategoriaDespesa);
      } catch (error) {
        notifyError("Erro ao carregar a categoria de despesa.");
        console.error("Erro ao carregar a categoria:", error);
      }
    };
  
    carregarCategoria();
  }, [id]);

  const validate = () => {
    if (!description) {
      notifyError("A descrição é obrigatória.");
      return false;
    }
    return true;
  };

  const handleAtualizarCategoria = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        await atualizarCategoriaDespesa(id, { descricaoCategoriaDespesa: description });
        notifySuccess("Categoria atualizada com sucesso!");
        navigate("/categoriadespesa");
      } catch (error) {
        notifyError("Erro ao atualizar a categoria de despesa.");
        console.error("Erro ao atualizar a categoria:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    }
  };
  
  

  return (
    <>
      <AppMenu />
      <div className="categoria-despesa">
        <div className="categoria-despesa-form">
          <h1>Editar Categoria de Despesa</h1>
          <Form onSubmit={handleAtualizarCategoria} loading={loading} error={!!error}>
            <Form.Field error={!!error}>
              <label>Descrição</label>
              <Input
                placeholder="Digite a descrição da Categoria"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {error && (
                <Message error content={error} />
              )}
            </Form.Field>
            <div className="save-button-container-categoria">
              <Button type="submit" className="save-button-categoria">
                Salvar
              </Button>
              <Button type="button" className="cancel-button-categoria" onClick={() => navigate("/categoriadespesa")}>
                Voltar
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default EditarCategoriaDespesa;
