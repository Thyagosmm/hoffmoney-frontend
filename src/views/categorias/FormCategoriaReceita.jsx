import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Message } from "semantic-ui-react";
import { buscarCategoriaReceitaPorId, registrarCategoriaReceita } from "../../api/UserApi";
import AppMenu from "../components/appMenu/AppMenu";
import { notifyError, notifySuccess } from "../utils/Utils";
import "./FormCategoriaReceita.css";

const FormCategoriaReceita = ({ categoriaId }) => {
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (categoriaId) {
      const fetchCategoria = async () => {
        try {
          const response = await buscarCategoriaReceitaPorId(categoriaId);
          setDescription(response.data.descricao);
        } catch (error) {
          notifyError("Erro ao buscar a categoria de receita.");
          console.error(error);
        }
      };
      fetchCategoria();
    }
  }, [categoriaId]);

  const validate = () => {
    if (!description) {
      notifyError("A descrição é obrigatória.");
      return false;
    }
    return true;
  };

  const handleRegistrarCategoria = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        await registrarCategoriaReceita({ descricaoCategoriaReceita: description });
        notifySuccess("Categoria registrada com sucesso!");
        setTimeout(() => {
          navigate("/categoriareceita");
        }, 1500);
      } catch (error) {
        notifyError("Erro ao registrar a categoria de receita.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="categoria-receita">
        <div className="categoria-receita-form">
          <h1>Cadastro de Categoria de Receita</h1>
          <Form
            onSubmit={handleRegistrarCategoria}
            loading={loading}
            error={!!errors.description}
          >
            <Form.Field error={!!errors.description}>
              <label>Descrição</label>
              <Input
                placeholder="Digite a descrição da Categoria"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description && (
                <Message error content={errors.description} />
              )}
            </Form.Field>
            <div className="save-button-container-categoria">
              <Button type="submit" className="save-button-categoria">
                Salvar
              </Button>
              <Button
                type="button"
                className="cancel-button-categoria"
                onClick={() => navigate("/categoriareceita")}
              >
                Voltar
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default FormCategoriaReceita;
