import React, { useState, useEffect } from "react";
import {
  Form,
  Menu,
  Segment,
  Icon,
  Button,
  Container,
  List,
  Modal,
  Header as SemanticHeader,
} from "semantic-ui-react";
import { listarReceitas, deletarReceita } from "../../api/UserApi";
import Header from "../../views/components/appMenu/AppMenu";
import "./ListaReceitas.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format, parse } from "date-fns";

const ListaReceitas = () => {
  const [receitas, setReceitas] = useState([]);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [receitaToDelete, setReceitaToDelete] = useState(null);
  const navigate = useNavigate();
  const [menuFiltro, setMenuFiltro] = useState(false);
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [valor, setValor] = useState("");
  const [dataDeCobranca, setDataDeCobranca] = useState("");

  function handleMenuFiltro() {
    setMenuFiltro(!menuFiltro);
  }

  function handleChangeNome(value) {
    filtrarReceitas(value, categoria, valor, dataDeCobranca);
  }

  function handleChangeCategoria(value) {
    filtrarReceitas(nome, value, valor, dataDeCobranca);
  }

  function handleChangeValor(value) {
    filtrarReceitas(nome, categoria, value, dataDeCobranca);
  }

  function handleChangeDataDeCobranca(value) {
    if (value) {
      try {
        const parsedDate = parse(value, "dd/MM/yyyy", new Date());
        const formattedDate = format(parsedDate, "dd/MM/yyyy"); // Formatando a data para o formato dd/MM/yyyy
        filtrarReceitas(nome, categoria, valor, formattedDate);
      } catch (error) {
        console.error("Erro ao converter a data:", error);
        // Adicionar mensagem de erro ao usuário, se desejado
      }
    } else {
      filtrarReceitas(nome, categoria, valor, "");
    }
  }

  async function filtrarReceitas(
    nomeParam,
    categoriaParam,
    valorParam,
    dataDeCobrancaParam
  ) {
    let formData = new FormData();

    if (nomeParam !== undefined) {
      setNome(nomeParam);
      formData.append("nome", nomeParam);
    }
    if (categoriaParam !== undefined) {
      setCategoria(categoriaParam);
      formData.append("categoria", categoriaParam);
    }
    if (valorParam !== undefined) {
      setValor(valorParam);
      formData.append("valor", valorParam);
    }
    if (dataDeCobrancaParam !== undefined) {
      setDataDeCobranca(dataDeCobrancaParam);
      formData.append("dataDeCobranca", dataDeCobrancaParam);
    }

    await axios
      .post("http://localhost:8085/api/receitas/filtrar", formData)
      .then((response) => {
        setReceitas(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  useEffect(() => {
    const getReceitas = async () => {
      try {
        const { data } = await listarReceitas();
        console.log("Receitas:", data);

        const receitasAgrupadas = data.reduce((acc, receita) => {
          const key = receita.id;
          if (!acc[key]) {
            acc[key] = { ...receita, count: 1 };
          } else {
            acc[key].count += 1;
          }
          return acc;
        }, {});

        const receitasAgrupadasList = Object.values(receitasAgrupadas);
        setReceitas(receitasAgrupadasList);
        const totalReceitas = receitasAgrupadasList.reduce((sum, receita) => {
          return sum + receita.valor * receita.count;
        }, 0);
        setTotal(totalReceitas);
      } catch (error) {
        setError(error.message);
      }
    };

    getReceitas();
  }, []);

  const handleDelete = async () => {
    const usuarioId = localStorage.getItem("userId");
    if (!usuarioId) {
      console.error("Usuário não autenticado.");
      return;
    }

    try {
      await deletarReceita(usuarioId, receitaToDelete);
      setReceitas((prevReceitas) =>
        prevReceitas.filter((receita) => receita.id !== receitaToDelete)
      );
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao excluir receita:", error);
      setError("Não foi possível excluir a receita.");
    }
  };

  const handleOpenModal = (id) => {
    setReceitaToDelete(id);
    setModalOpen(true);
  };

  const handleEdit = (id) => {
    navigate(`/editarReceita/${id}`);
  };

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <>
      <Header />
      <Container className="receitas">
        <h1 className="containerHeader">Receitas</h1>
        <Menu compact>
          <Menu.Item
            name="menuFiltro"
            active={menuFiltro === true}
            onClick={handleMenuFiltro}
          >
            <Icon name="filter" />
            Filtrar
          </Menu.Item>
        </Menu>
        {menuFiltro && (
          <Segment>
            <Form className="form-filtros">
              <Form.Group>
                <Form.Input
                  width={8}
                  fluid
                  icon="search"
                  value={nome}
                  onChange={(e) => handleChangeNome(e.target.value)}
                  label="Nome"
                  placeholder="Filtrar por Nome da Receita"
                  labelPosition="left"
                />
                <Form.Input
                  width={4}
                  fluid
                  icon="search"
                  value={categoria}
                  onChange={(e) => handleChangeCategoria(e.target.value)}
                  label="Categoria"
                  placeholder="Filtrar por categoria"
                  labelPosition="left"
                />
                <Form.Input
                  width={4}
                  fluid
                  type="number"
                  value={valor}
                  onChange={(e) => handleChangeValor(e.target.value)}
                  label="Valor"
                  placeholder="0"
                  labelPosition="left"
                />
                <Form.Input
                  width={4}
                  fluid
                  type="text"
                  icon="calendar"
                  onChange={(e) => handleChangeDataDeCobranca(e.target.value)}
                  label="Data"
                  placeholder="dd/MM/yyyy"
                  labelPosition="left"
                />
              </Form.Group>
            </Form>
          </Segment>
        )}
        <Segment className="segment-receitas">
          <List divided verticalAlign="middle">
            {receitas.length > 0 ? (
              receitas.map((receita) => (
                <List.Item key={receita.id}>
                  <List.Content floated="right">
                    <Button
                      icon
                      color="blue"
                      onClick={() => handleEdit(receita.id)}
                    >
                      <Icon name="edit" />
                    </Button>
                    <Button
                      icon
                      color="red"
                      onClick={() => handleOpenModal(receita.id)}
                    >
                      <Icon name="trash" />
                    </Button>
                  </List.Content>
                  <Icon name="money" size="large" color="green" />
                  <List.Content>
                    <List.Header>{receita.nome}</List.Header>
                    <List.Description>
                      Categoria: {receita.categoria} | Valor: {receita.valor} |
                      Data de Recebimento: {receita.dataDeCobranca}
                    </List.Description>
                  </List.Content>
                </List.Item>
              ))
            ) : (
              <p>Nenhuma receita encontrada.</p>
            )}
          </List>
        </Segment>
        <div className="total-container">
          <strong>Total Receitas: </strong>
          <span>{total}</span>
        </div>
      </Container>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        size="small"
        dimmer="blurring"
        closeIcon
      >
        <SemanticHeader icon="trash" content="Excluir Receita" />
        <Modal.Content>
          <p>Você tem certeza que deseja excluir esta receita?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setModalOpen(false)}>
            <Icon name="remove" /> Não
          </Button>
          <Button color="green" onClick={handleDelete}>
            <Icon name="checkmark" /> Sim
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default ListaReceitas;
