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
} from "semantic-ui-react";
import {
  despesaPaga,
  deletarDespesa,
  listarDespesas,
  decrementarSaldo,
  listarCategoriasDespesa,
  filtrarDespesas,
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

  // Função para alternar a exibição do menu de filtro
  function handleMenuFiltro() {
    setMenuFiltro(!menuFiltro);
  }

  // Carregar todas as despesas na montagem do componente
  useEffect(() => {
    const fetchDespesas = async () => {
      try {
        const { data } = await listarDespesas();
        setDespesas(data);
        atualizarListas(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchDespesas();
  }, []);

  // Carregar as categorias de despesa na montagem do componente
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

  // Função para excluir despesa
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

  // Atualizar listas e total após mudanças nos dados
  const atualizarListas = (dadosDespesas) => {
    const despesasPagasAtualizadas = dadosDespesas.filter(
      (despesa) => despesa.paga
    );
    const despesasNaoPagasAtualizadas = dadosDespesas.filter(
      (despesa) => !despesa.paga
    );
    setDespesasPagas(despesasPagasAtualizadas);
    setDespesasNaoPagas(despesasNaoPagasAtualizadas);

    const totalDespesasAtualizado = dadosDespesas.reduce(
      (sum, despesa) => sum + (despesa.valor || 0),
      0
    );
    setTotal(totalDespesasAtualizado);
  };

  // Abrir modal de confirmação (pagar ou excluir)
  const handleOpenModal = (id, action) => {
    setDespesaId(id);
    setActionType(action);
    setModalOpen(true);
  };

  const handleDespesaPaga = async () => {
    try {
      await despesaPaga(despesaId, true);
      setModalOpen(false);
      notifySuccess("Despesa paga com sucesso!");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Erro ao atualizar a despesa:", error);
      notifyError(`Não foi possível atualizar a despesa: ${error.message}`);
    }
  };

  // Editar despesa
  const handleEdit = (id) => {
    navigate(`/editarDespesa/${id}`);
  };

  // Criar nova despesa
  const handleCreateNew = () => {
    navigate("/novaDespesa");
  };

  if (error) {
    return <div>Erro: {error}</div>;
  }

  // Aplicar filtros
  const handleApplyFilters = async () => {
    const filtros = {
      nome,
      idCategoriaDespesa: categoria,
      valor: valor !== "" ? parseFloat(valor) : null,
      dataDeCobranca,
    };

    try {
      const { data } = await filtrarDespesas(filtros);
      setDespesas(data);
      atualizarListas(data);
      notifySuccess("Filtros aplicados com sucesso!");
    } catch (error) {
      console.error("Erro ao filtrar despesas:", error);
      notifyError("Não foi possível aplicar os filtros.");
    }
  };

  // Limpar filtros e recarregar todas as despesas
  const handleResetFilters = async () => {
    setNome("");
    setCategoria("");
    setValor("");
    setDataDeCobranca("");
    try {
      const { data } = await listarDespesas();
      setDespesas(data);
      atualizarListas(data);
      notifySuccess("Filtros limpos com sucesso!");
    } catch (error) {
      console.error("Erro ao recarregar despesas:", error);
      notifyError("Não foi possível recarregar as despesas.");
    }
  };

  return (
    <>
      <Header />
      <Container className="container-bordered">
        <h1 className="containerHeader">Despesas</h1>
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
              Nova Despesa
            </Button>
          </Menu.Item>
          <Menu.Item position="right">
            <div className="total-container">
              <strong>Total em Despesas: R$ </strong>
              <span>{total.toFixed(2)}</span>
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
                    onChange={(e) => setNome(e.target.value)}
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
                      onChange={(e, { value }) => setCategoria(value)}
                      clearable
                    />
                  </Form.Field>
                </Form.Group>

                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    type="number"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    label="Valor"
                    placeholder="0"
                    labelPosition="left"
                  />
                  <Form.Input
                    fluid
                    type="date"
                    value={dataDeCobranca}
                    onChange={(e) => setDataDeCobranca(e.target.value)}
                    label="Data de Cobrança"
                    placeholder="DD/MM/YYYY"
                    labelPosition="left"
                  />
                </Form.Group>
              </Form>
              <Button color="green" onClick={handleApplyFilters}>
                Aplicar Filtros
              </Button>
              <Button color="red" onClick={handleResetFilters}>
                Limpar Filtros
              </Button>
            </Segment>
          )}
        </Container>

        <div className="despesas">
          <Segment className="segment-despesas">
            <Menu inverted>
              <h2 className="header-nao-pagas">Não Pagas</h2>
            </Menu>
            <List divided verticalAlign="middle" className="lista-items">
              {despesasNaoPagas.length > 0 ? (
                despesasNaoPagas.map((despesa) => (
                  <List.Item className="items-lista" key={despesa.id}>
                    <List.Content floated="right">
                      <Button
                        icon
                        color="green"
                        onClick={() => handleOpenModal(despesa.id, "pagar")}
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
                        onClick={() => handleOpenModal(despesa.id, "excluir")}
                      >
                        <Icon name="trash" />
                      </Button>
                    </List.Content>
                    <Icon name="money" size="large" color="red" />
                    <List.Content>
                      <List.Header>{despesa.nome}</List.Header>
                      <List.Description>
                        {despesa.categoriaDespesa
                          ? despesa.categoriaDespesa.descricaoCategoriaDespesa
                          : "Sem categoria"}{" "}
                        | R$ {despesa.valor.toFixed(2)} |{" "}
                        {new Date(
                          despesa.dataDeCobranca + "T00:00:00"
                        ).toLocaleDateString()}
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
            <List divided verticalAlign="middle" className="lista-items">
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
                        onClick={() => handleOpenModal(despesa.id, "excluir")}
                      >
                        <Icon name="trash" />
                      </Button>
                    </List.Content>
                    <Icon name="money" size="large" color="green" />
                    <List.Content>
                      <List.Header>{despesa.nome}</List.Header>
                      <List.Description>
                        {despesa.categoriaDespesa
                          ? despesa.categoriaDespesa.descricaoCategoriaDespesa
                          : "Sem categoria"}{" "}
                        | R$ {despesa.valor.toFixed(2)} |{" "}
                        {new Date(
                          despesa.dataDeCobranca + "T00:00:00"
                        ).toLocaleDateString()}
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
          <SemanticHeader
            icon={actionType === "excluir" ? "trash" : "check"}
            content={
              actionType === "excluir"
                ? "Excluir Despesa"
                : "Confirmar Pagamento"
            }
          />
          <Modal.Content>
            <span>
              {actionType === "excluir"
                ? "Você tem certeza que deseja excluir esta despesa?"
                : "Você realmente pagou esta despesa?"}
            </span>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" onClick={() => setModalOpen(false)}>
              <Icon name="remove" /> Não
            </Button>
            <Button
              color="green"
              onClick={
                actionType === "excluir" ? handleDelete : handleDespesaPaga
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
