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
import { listarDespesas, deletarDespesa } from "../../api/UserApi";
import Header from "../../views/components/appMenu/AppMenu";
import "./ListaDespesas.css";
import axios from "axios";
import { format, parse } from "date-fns";
import { useNavigate } from "react-router-dom";

const ListaDespesas = () => {
  const [despesas, setDespesas] = useState([]);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [despesaToDelete, setDespesaToDelete] = useState(null);
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

        const despesasAgrupadas = data.reduce((acc, despesa) => {
          const key = despesa.id;
          if (!acc[key]) {
            acc[key] = { ...despesa, count: 1 };
          } else {
            acc[key].count += 1;
          }
          return acc;
        }, {});

        const despesasAgrupadasList = Object.values(despesasAgrupadas);
        setDespesas(despesasAgrupadasList);
        const totalDespesas = despesasAgrupadasList.reduce((sum, despesa) => {
          return sum + despesa.valor * despesa.count;
        }, 0);
        setTotal(totalDespesas);
      } catch (error) {
        setError(error.message);
      }
    };

    getDespesas();
  }, []);

  const handleDelete = async () => {
    const usuarioId = localStorage.getItem("userId");
    if (!usuarioId) {
      console.error("Usuário não autenticado.");
      return;
    }

    try {
      await deletarDespesa(usuarioId, despesaToDelete);
      setDespesas((prevDespesas) =>
        prevDespesas.filter((despesa) => despesa.id !== despesaToDelete)
      );
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao excluir despesa:", error);
      setError("Não foi possível excluir a despesa.");
    }
  };

  const handleOpenModal = (id) => {
    setDespesaToDelete(id);
    setModalOpen(true);
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
      <Header />
      <Container className="despesas">
        <h1 className="containerHeader">Despesas</h1>
        <Menu compact>
          <Menu.Item
            name="menuFiltro"
            active={menuFiltro === true}
            onClick={handleMenuFiltro}
          >
            <Icon name="filter" />
            Filtrar
          </Menu.Item>
          <Menu.Item position="right">
            <Button icon color="green" onClick={handleCreateNew}>
              <Icon name="plus" />
              Nova Despesa
            </Button>
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
                  placeholder="Filtrar por Nome da Despesa"
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
        <Segment className="segment-despesas">
          <List divided verticalAlign="middle">
            {despesas.length > 0 ? (
              despesas.map((despesa) => (
                <List.Item key={despesa.id}>
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
                      onClick={() => handleOpenModal(despesa.id)}
                    >
                      <Icon name="trash" />
                    </Button>
                  </List.Content>
                  <Icon name="money" size="large" color="red" />
                  <List.Content>
                    <List.Header>{despesa.nome}</List.Header>
                    <List.Description>
                      Categoria: {despesa.categoria} | Valor: {despesa.valor} |
                      Data de Cobrança: {despesa.dataDeCobranca}
                    </List.Description>
                  </List.Content>
                </List.Item>
              ))
            ) : (
              <p>Nenhuma despesa encontrada.</p>
            )}
          </List>
        </Segment>
        <div className="total-container">
          <strong>Total Despesas: </strong>
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
        <SemanticHeader icon="trash" content="Excluir Despesa" />
        <Modal.Content>
          <p>Você tem certeza que deseja excluir esta despesa?</p>
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

export default ListaDespesas;
