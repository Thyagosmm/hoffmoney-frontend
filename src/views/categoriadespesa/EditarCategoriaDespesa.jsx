import React, { useState, useEffect } from "react";
import { Form, Button } from "semantic-ui-react";
import { buscarCategoriaPorId, atualizarCategoria } from "../../api/UserApi";
import Header from "../components/appMenu/AppMenu";
import { useParams, useNavigate } from "react-router-dom";
import "./FormCategoriaDespesa.css";

const EditarCategoriaDespesa = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const usuarioId = localStorage.getItem("userId");

  useEffect(() => {
    const carregarCategoria = async () => {
      try {
        const response = await buscarCategoriaPorId(usuarioId, id);
        const categoriaData = response.data;
        setNome(categoriaData.nome);
        setDescricao(categoriaData.descricao);
      } catch (error) {
        console.error("Erro ao carregar a categoria", error);
        setError("Erro ao carregar a categoria.");
      }
    };

    carregarCategoria();
  }, [id, usuarioId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await atualizarCategoria(usuarioId, id, {
        nome,
        descricao,
      });
      setSuccess("Categoria atualizada com sucesso!");
      navigate("/categorias");
    } catch (error) {
      console.error("Erro ao atualizar a categoria", error);
      setError("Erro ao atualizar a categoria.");
    }
  };

  return (
    <>
      <div className="container">
        <Header />
        <div className="categoria">
          <div className="categoria-form">
            <h1>Editar Categoria</h1>
            <div className="form-content">
              <div className="form-fields">
                <Form onSubmit={handleSubmit}>
                  <Form.Field>
                    <label>Nome</label>
                    <input
                      className="input-field"
                      placeholder="Digite o nome da Categoria"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      required
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Descrição</label>
                    <input
                      className="input-field"
                      placeholder="Digite uma descrição para a categoria"
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                    />
                  </Form.Field>
                  <Button type="submit" className="form-button">
                    Salvar
                  </Button>
                </Form>
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

export default EditarCategoriaDespesa;