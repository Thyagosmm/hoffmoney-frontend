import React, { useState, useEffect } from "react";
import { Form, Button, Dropdown } from "semantic-ui-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./FormDespesa.css";
import {
  buscarDespesaPorId,
  atualizarDespesa,
  listarCategoriasDespesa,
} from "../../api/UserApi";
import Header from "../components/appMenu/AppMenu";
import { useParams, useNavigate } from "react-router-dom";

const EditarDespesa = () => {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState(new Date());
  const [paga, setPaga] = useState(false);
  const [listaCategoriaDespesa, setListaCategoriaDespesa] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const usuarioId = localStorage.getItem("userId");

  useEffect(() => {
    const carregarDespesa = async () => {
      try {
        const response = await buscarDespesaPorId(usuarioId, id);
        const despesaData = response.data;
        setNome(despesaData.nome);
        setValor(despesaData.valor);
        setCategoria(despesaData.categoriaDespesa.id);
        setDescricao(despesaData.descricao);
        const dataDespesa = new Date(despesaData.dataDeCobranca + "T00:00:00");
        if (!isNaN(dataDespesa.getTime())) {
          setData(dataDespesa);
        } else {
          console.error("Data inválida:", despesaData.dataDeCobranca);
        }
        setPaga(despesaData.paga ?? false);
      } catch (error) {
        console.error("Erro ao carregar a despesa", error);
        setError("Erro ao carregar a despesa.");
      }
    };

    carregarDespesa();

    const fetchCategorias = async () => {
      try {
        const response = await listarCategoriasDespesa();
        const dropDownCategoriaDespesa = response.data.map((categoria) => ({
          key: categoria.id,
          text: categoria.descricaoCategoriaDespesa,
          value: categoria.id,
        }));
        setListaCategoriaDespesa(dropDownCategoriaDespesa);
      } catch (error) {
        console.error("Erro ao carregar categorias", error);
        setError("Erro ao carregar categorias.");
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
    try {
      await atualizarDespesa(usuarioId, id, {
        nome,
        valor,
        idCategoriaDespesa: categoria,
        descricao,
        dataDeCobranca: formattedDate,
        paga: paga,
      });
      setSuccess("Despesa atualizada com sucesso!");
      navigate("/despesas");
    } catch (error) {
      console.error("Erro ao atualizar a despesa", error);
      setError("Erro ao atualizar a despesa.");
    }
  };

  return (
    <>
      <div className="container">
        <div className="despesa">
          <div className="despesa-form">
            <h1>Editar Despesa</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <label>Nome</label>
                <input
                  placeholder="Digite o nome da Despesa"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <label>Valor</label>
                <input
                  placeholder="Digite o valor da Despesa"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <label>Categoria</label>
                <Dropdown
                  placeholder="Selecione a categoria"
                  fluid
                  selection
                  options={listaCategoriaDespesa}
                  value={categoria}
                  onChange={(e, { value }) => setCategoria(value)}
                />
              </Form.Field>
              <Form.Field>
                <label>Descrição</label>
                <input
                  placeholder="Digite uma descrição para a despesa"
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

export default EditarDespesa;
