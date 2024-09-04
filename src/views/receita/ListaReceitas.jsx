import axios from "axios";
import { format, parse } from "date-fns";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Form,
  Icon,
  List,
  Menu,
  Modal,
  Segment,
  Header as SemanticHeader,
} from "semantic-ui-react";
import {
  listarReceitas,
  deletarReceita,
  receitaPaga,
  incrementarSaldo,
} from "../../api/UserApi";
import Header from "../../views/components/appMenu/AppMenu";
import "./ListaReceitas.css";
import { notifyError, notifySuccess } from "../utils/Utils";

const ListaReceitas = () => {
  const [receitas, setReceitas] = useState([]);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [receitaId, setReceitaId] = useState(null);
  const [actionType, setActionType] = useState("");
  const navigate = useNavigate();
  const [menuFiltro, setMenuFiltro] = useState(false);
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [valor, setValor] = useState("");
  const [dataDeCobranca, setDataDeCobranca] = useState("");
  const [receitasPagas, setReceitasPagas] = useState([]);
  const [receitasNaoPagas, setReceitasNaoPagas] = useState([]);

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
        const formattedDate = format(parsedDate, "dd/MM/yyyy");
        filtrarReceitas(nome, categoria, valor, formattedDate);
      } catch (error) {
        console.error("Erro ao converter a data:", error);
      }
    } else {
      filtrarReceitas(nome, categoria, valor, "");
    }
  }

  async function filtrarReceitas(
    nomeParam,
    categoriaParam,
    valorParam,
    dataDeCobrancaParam,
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

        const receitasPagas = data.filter((receita) => receita.paga);
        const receitasNaoPagas = data.filter((receita) => !receita.paga);

        setReceitasPagas(receitasPagas);
        setReceitasNaoPagas(receitasNaoPagas);

        const totalReceitas = data.reduce((sum, receita) => {
          return sum + receita.valor;
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
      await deletarReceita(usuarioId, receitaId);
      setReceitas((prevReceitas) =>
        prevReceitas.filter((receita) => receita.id !== receitaId),
      );
      setModalOpen(false);
      notifySuccess("Receita deletada com sucesso!");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Erro ao excluir receita:", error);
      notifyError("Não foi possível excluir a receita.");
    }
  };

  const handleOpenModal = (id, action) => {
    setReceitaId(id);
    setActionType(action);
    setModalOpen(true);
  };
  const handleReceitaPaga = async () => {
    try {
      const response = await receitaPaga(receitaId, true);
      console.log("Receita atualizada com sucesso:", response);
      setModalOpen(false);
      notifySuccess("Receita paga com sucesso!");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Erro ao atualizar a receita:", error);
      notifyError("Erro ao atualizar a receita.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/editarReceita/${id}`);
  };

  const handleCreateNew = () => {
    navigate("/novaReceita");
  };

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <>
      <Header />
      <Container className="container-bordered">
        <h1 className="containerHeader">Receitas</h1>
        <Menu>
          <Menu.Item
            name="menuFiltro"
            active={menuFiltro === true}
            onClick={handleMenuFiltro}
          >
            <Icon name="filter" />
            Filtrar
          </Menu.Item>
          <Menu.Item position="left">
            <Button
              className="form-button"
              icon
              color="green"
              onClick={handleCreateNew}
            >
              <Icon name="plus" />
              Nova Receita
            </Button>
          </Menu.Item>
          <Menu.Item position="right">
            <div className="total-container">
              <strong>Total em Receitas: R$ </strong>
              <span>{total}</span>
            </div>
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
        <div className="receitas">
          <Segment className="segment-receitas">
            <Menu inverted>
              <h2 className="header-nao-pagas">Não Recebidas</h2>
            </Menu>
            <List className="lista-items" divided verticalAlign="middle">
              {receitasNaoPagas.length > 0 ? (
                receitasNaoPagas.map((receita) => (
                  <List.Item className="items-lista" key={receita.id}>
                    <List.Content floated="right">
                      <Button
                        icon
                        color="green"
                        onClick={() => handleOpenModal(receita.id, "check")}
                      >
                        <Icon name="check" />
                      </Button>
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
                        onClick={() => handleOpenModal(receita.id, "delete")}
                      >
                        <Icon name="trash" />
                      </Button>
                    </List.Content>
                    <Icon name="money" size="large" color="red" />
                    <List.Content>
                      <List.Header>{receita.nome}</List.Header>
                      <List.Description>
                        {receita.categoriaReceita.descricaoCategoriaReceita} |
                        R$ {receita.valor} | {receita.dataDeCobranca}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                ))
              ) : (
                <span>Nenhuma receita não recebida encontrada.</span>
              )}
            </List>
          </Segment>
          <Segment className="segment-receitas">
            <Menu inverted>
              <h2 className="header-pagas">Recebidas</h2>
            </Menu>
            <List className="lista-items" divided verticalAlign="middle">
              {receitasPagas.length > 0 ? (
                receitasPagas.map((receita) => (
                  <List.Item className="items-lista" key={receita.id}>
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
                        {receita.categoriaReceita.descricaoCategoriaReceita} |
                        R$ {receita.valor} | {receita.dataDeCobranca}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                ))
              ) : (
                <span>Nenhuma receita recebida encontrada.</span>
              )}
            </List>
          </Segment>
        </div>

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          size="small"
          dimmer="blurring"
          closeIcon
        >
          <SemanticHeader
            icon={actionType === "delete" ? "trash" : "check"}
            content={
              actionType === "delete"
                ? "Excluir Receita"
                : "Confirmar Pagamento"
            }
          />
          <Modal.Content>
            <span>
              {actionType === "delete"
                ? "Você tem certeza que deseja excluir esta receita?"
                : "Você realmente recebeu esta receita?"}
            </span>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" onClick={() => setModalOpen(false)}>
              <Icon name="remove" /> Não
            </Button>
            <Button
              color="green"
              onClick={
                actionType === "delete" ? handleDelete : handleReceitaPaga
              }
            >
              <Icon name="checkmark" /> Sim
            </Button>
          </Modal.Actions>
        </Modal>
      </Container>
    </>
  );
};

export default ListaReceitas;
