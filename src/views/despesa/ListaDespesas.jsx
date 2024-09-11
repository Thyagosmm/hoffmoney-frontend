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
  Dropdown,
  ModalHeader,
} from "semantic-ui-react";
import {
  despesaPaga,
  deletarDespesa,
  listarDespesas,
  decrementarSaldo, listarCategoriasDespesa
} from "../../api/UserApi";
import Header from "../../views/components/appMenu/AppMenu";
import "./ListaDespesas.css";
import { notifyError, notifySuccess } from "../utils/Utils";

const ListaDespesas = () => {
  const [despesas, setDespesas] = useState([]);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [despesaId, setDespesaId] = useState(null);
  const [actionType, setActionType] = useState("");
  const [menuFiltro, setMenuFiltro] = useState(false);
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [valor, setValor] = useState("");
  const [dataDeCobranca, setDataDeCobranca] = useState("");
  const [listaCategoriaDespesa, setListaCategoriaDespesa] = useState([]);
  const [despesasPagas, setDespesasPagas] = useState([]);
  const [despesasNaoPagas, setDespesasNaoPagas] = useState([]);
  const navigate = useNavigate();

  function handleMenuFiltro() {
    setMenuFiltro(!menuFiltro);
  }

  function handleChangeNome(value) {
    filtrarDespesas(value, categoria, valor, dataDeCobranca);
  }

  function handleChangeCategoria(value) {
    filtrarDespesas(nome, value, valor, dataDeCobranca);
  }

  function handleChangeValor(value) {
    filtrarDespesas(nome, categoria, value, dataDeCobranca);
  }

  function handleChangeDataDeCobranca(value) {
    if (value) {
      try {
        const parsedDate = parse(value, "dd/MM/yyyy", new Date());
        const formattedDate = format(parsedDate, "dd/MM/yyyy");
        filtrarDespesas(nome, categoria, valor, formattedDate);
      } catch (error) {
        console.error("Erro ao converter a data:", error);
      }
    } else {
      filtrarDespesas(nome, categoria, valor, "");
    }
  }

  async function filtrarDespesas(
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
      formData.append("categoria", categoriaParam); // Enviar ID da categoria selecionada
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
      .post("http://localhost:8085/api/despesas/filtrar", formData)
      .then((response) => {
        setDespesas(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  useEffect(() => {
    const getDespesas = async () => {
      try {
        const { data } = await listarDespesas();
        console.log("Despesas:", data);

        const despesasPagas = data.filter((despesa) => despesa.paga);
        const despesasNaoPagas = data.filter((despesa) => !despesa.paga);

        setDespesasPagas(despesasPagas);
        setDespesasNaoPagas(despesasNaoPagas);

        const totalDespesas = data.reduce((sum, despesa) => {
          return sum + despesa.valor;
        }, 0);
        setTotal(totalDespesas);
      } catch (error) {
        setError(error.message);
      }
    };

    getDespesas();
  }, []);

  useEffect(() => {
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
        console.error("Erro ao carregar categorias:", error);
      }
    };

    fetchCategorias();
  }, []);

  const handleDelete = async () => {
    const usuarioId = localStorage.getItem("userId");
    if (!usuarioId) {
      console.error("Usuário não autenticado.");
      return;
    }

    try {
      await deletarDespesa(usuarioId, despesaId);
      setDespesas((prevDespesas) =>
        prevDespesas.filter((despesa) => despesa.id !== despesaId)
      );
      setModalOpen(false);
      notifySuccess("Despesa deletada com sucesso!");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Erro ao excluir despesa:", error);
      notifyError("Não foi possível excluir a despesa.");
    }
  };

  const handleOpenModal = (id, action) => {
    setDespesaId(id);
    setActionType(action);
    setModalOpen(true);
  };
  const handleDespesaPaga = async () => {
    try {
      const response = await despesaPaga(despesaId, true);
      const despesa = despesas.find((despesa) => despesa.id === despesaId);
      if (despesa) {
        await decrementarSaldo(despesa.valor);
      }
      console.log("Despesa atualizada com sucesso:", response.status);
      setModalOpen(false);
      notifySuccess("Despesa paga com sucesso!");

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Erro ao atualizar a despesa:", error);
    }
  };
  const handleEdit = (id) => {
    navigate(`/editarDespesa/${id}`);
  };

  const handleCreateNew = () => {
    navigate("/novaDespesa");
  };

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <>
      <Container className="container-bordered">
        <h1 className="containerHeader">Despesas</h1>
        <Menu>
          <Menu.Item
            name="menuFiltro"
            active={menuFiltro === true}
            onClick={handleMenuFiltro}
          >
            <h4 className="filtro-label">
              <Icon name="filter" />
              Filtrar
            </h4>
          </Menu.Item>
          <Menu.Item position="left">
            <Button
              className="form-button"
              icon
              color="green"
              onClick={handleCreateNew}
            >
              <Icon name="plus" />
              Nova Despesa
            </Button>
          </Menu.Item>
          <Menu.Item position="right">
            <div className="total-container">
              <strong>Total em Despesas: R$ </strong>
              <span>{total}</span>
            </div>
          </Menu.Item>
        </Menu>
        <Container className="containerFiltro">
          {menuFiltro && (
            <Segment>
              <Form className="form-filtros">
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    icon="search"
                    value={nome}
                    onChange={(e) => handleChangeNome(e.target.value)}
                    label="Nome"
                    placeholder="Filtrar por Nome da Despesa"
                    labelPosition="left"
                  />
                  <Form.Field className="dropCategoriaDespesa">
                    <label>Categoria</label>
                    <Dropdown
                      fluid
                      selection
                      placeholder="Selecione"
                      options={listaCategoriaDespesa}
                      value={categoria}
                      onChange={(e, { value }) => handleChangeCategoria(value)}
                    />
                  </Form.Field>
                </Form.Group>

                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    type="number"
                    value={valor}
                    onChange={(e) => handleChangeValor(e.target.value)}
                    label="Valor"
                    placeholder="0"
                    labelPosition="left"
                  />
                  <Form.Input
                    fluid
                    type="text"
                    icon="calendar"
                    value={dataDeCobranca}
                    onChange={(e) => handleChangeDataDeCobranca(e.target.value)}
                    label="Data"
                    placeholder="dd/MM/yyyy"
                    labelPosition="left"
                  />
                </Form.Group>
              </Form>
            </Segment>
          )}
        </Container>
        <div className="despesas">
          <Segment className="segment-despesas">
            <Menu inverted>
              <h2 className="header-nao-pagas">Não Pagas</h2>
            </Menu>
            <List className="lista-items" divided verticalAlign="middle">
              {despesasNaoPagas.length > 0 ? (
                despesasNaoPagas.map((despesa) => (
                  <List.Item className="items-lista" key={despesa.id}>
                    <List.Content floated="right">
                      <Button
                        icon
                        color="green"
                        onClick={() => handleOpenModal(despesa.id, "check")}
                      >
                        <Icon name="check" />
                      </Button>
                      <Button
                        icon
                        color="blue"
                        onClick={() => handleEdit(despesa.id)}
                      >
                        <Icon name="edit" />
                      </Button>
                      <Button
                        icon
                        color="red"
                        onClick={() => handleOpenModal(despesa.id, "delete")}
                      >
                        <Icon name="trash" />
                      </Button>
                    </List.Content>
                    <List.Content>
                      <List.Header className="header-listas">
                        {despesa.nome}
                      </List.Header>
                      <List.Description>
                        {despesa.categoriaDespesa.descricaoCategoriaDespesa} |
                        R${despesa.valor} | {despesa.dataDeCobranca}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                ))
              ) : (
                <span>Nenhuma despesa não paga encontrada.</span>
              )}
            </List>
          </Segment>
          <Segment className="segment-despesas">
            <Menu inverted>
              <h2 className="header-pagas">Pagas</h2>
            </Menu>
            <List className="lista-items" divided verticalAlign="middle">
              {despesasPagas.length > 0 ? (
                despesasPagas.map((despesa) => (
                  <List.Item className="items-lista" key={despesa.id}>
                    <List.Content floated="right">
                      <Button
                        icon
                        color="blue"
                        onClick={() => handleEdit(despesa.id)}
                      >
                        <Icon name="edit" />
                      </Button>
                      <Button
                        icon
                        color="red"
                        onClick={() => handleOpenModal(despesa.id, "delete")}
                      >
                        <Icon name="trash" />
                      </Button>
                    </List.Content>
                    <List.Content>
                      <List.Header>{despesa.nome}</List.Header>
                      <List.Description>
                        {despesa.categoriaDespesa.descricaoCategoriaDespesa} |
                        R$ {despesa.valor} | {despesa.dataDeCobranca}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                ))
              ) : (
                <span>Nenhuma despesa paga encontrada.</span>
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
          <ModalHeader
            icon={actionType === "delete" ? "trash" : "check"}
            content={
              actionType === "delete"
                ? "Excluir Despesa"
                : "Confirmar Pagamento"
            }
          />
          <Modal.Content>
            <h4>
              {actionType === "delete"
                ? "Você tem certeza que deseja excluir esta despesa?"
                : "Você realmente pagou esta despesa?"}
            </h4>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" onClick={() => setModalOpen(false)}>
              <Icon name="remove" /> Não
            </Button>
            <Button
              color="green"
              onClick={
                actionType === "delete" ? handleDelete : handleDespesaPaga
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

export default ListaDespesas;
