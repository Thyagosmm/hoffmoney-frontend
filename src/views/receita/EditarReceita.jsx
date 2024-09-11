import React, { useState, useEffect } from "react";
import { Form, Button, Dropdown } from "semantic-ui-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./FormReceita.css";
import { buscarReceitaPorId, atualizarReceita, listarCategoriasReceita } from "../../api/UserApi";
import Header from "../components/appMenu/AppMenu";
import { useParams, useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../utils/Utils";

const EditarReceita = () => {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState(new Date());
  const [paga, setPaga] = useState(false);
  const [listaCategoriaReceita, setListaCategoriaReceita] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const usuarioId = localStorage.getItem("userId");

  useEffect(() => {
    const carregarReceita = async () => {
      try {
        const response = await buscarReceitaPorId(usuarioId, id);
        const receitaData = response.data;
        setNome(receitaData.nome);
        setValor(receitaData.valor);
        setCategoria(receitaData.categoriaReceita.id);
        setDescricao(receitaData.descricao);
        setPaga(receitaData.paga);
        const dataReceita = new Date(receitaData.dataDeCobranca + "T00:00:00");
        if (!isNaN(dataReceita.getTime())) {
          setData(dataReceita);
        } else {
          console.error("Data inválida:", receitaData.dataDeCobranca);
        }
        setPaga(receitaData.paga ?? false);
      } catch (error) {
        console.error("Erro ao carregar a receita", error);
        notifyError("Erro ao carregar a receita.");
      }
    };

    carregarReceita();

    const fetchCategorias = async () => {
      try {
        const response = await listarCategoriasReceita();
        const dropDownCategoriaReceita = response.data.map(categoria => ({
          key: categoria.id,
          text: categoria.descricaoCategoriaReceita,
          value: categoria.id,
        }));
        setListaCategoriaReceita(dropDownCategoriaReceita);
      } catch (error) {
        console.error("Erro ao carregar categorias", error);
        notifyError("Erro ao carregar categorias.");
      }
    };

    fetchCategorias();
  }, [id, usuarioId]);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = formatDate(data);

    if (!nome || !valor || !categoria) {
      notifyError("Nome, valor e categoria são obrigatórios.");
      return;
    }
    if (valor < 0) {
      notifyError("O valor da receita não pode ser negativo.");
      return;
    }

    try {
      await atualizarReceita(usuarioId, id, {
        nome,
        valor,
        idCategoriaReceita: categoria,
        descricao,
        dataDeCobranca: formattedDate,
        paga: paga
      });
      notifySuccess("Receita atualizada com sucesso!");
      setTimeout(() => {
        navigate("/receitas");
      }, 2000);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Erro ao atualizar a receita", error);
      notifyError("Erro ao atualizar a receita.");
    }
  };

  return (
    <>
      <div className="container">
        <div className="receita">
          <div className="receita-form">
            <h1>Editar Receita</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <label>Nome</label>
                <input
                  placeholder="Digite o nome da Receita"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <label>Valor</label>
                <input
                  type="number"
                  placeholder="Digite o valor da Receita"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                />
              </Form.Field>
              <Form.Field className="dropCategoriaReceita">
                <label>Categoria</label>
                <Dropdown
                  placeholder="Selecione a categoria"
                  fluid
                  selection
                  options={listaCategoriaReceita}
                  value={categoria}
                  onChange={(e, { value }) => setCategoria(value)}
                />
              </Form.Field>
              <Form.Field>
                <label>Descrição</label>
                <input
                  placeholder="Digite uma descrição para a receita"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <label>Data</label>
                <Calendar onChange={setData} value={data} />
              </Form.Field>
              <Button type="submit" primary>
                Salvar
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditarReceita;
