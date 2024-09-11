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
  listarReceitas,
  deletarReceita,
  receitaPaga,
  listarCategoriasReceita,
  filtrarReceitas,
} from "../../api/UserApi";
import "./ListaReceitas.css";
import { notifyError, notifySuccess } from "../utils/Utils";

const ListaReceitas = () => {
  const [receitas, setReceitas] = useState([]);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [receitaId, setReceitaId] = useState(null);
  const [actionType, setActionType] = useState("");
  const [menuFiltro, setMenuFiltro] = useState(false);
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [valor, setValor] = useState("");
  const [dataDeCobranca, setDataDeCobranca] = useState("");
  const [listaCategoriaReceita, setListaCategoriaReceita] = useState([]);
  const [receitasPagas, setReceitasPagas] = useState([]);
  const [receitasNaoPagas, setReceitasNaoPagas] = useState([]);
  const navigate = useNavigate();

  // Função para alternar a exibição do menu de filtro
  function handleMenuFiltro() {
    setMenuFiltro(!menuFiltro);
  }

  // Função para atualizar listas e total
  const atualizarListas = (dadosReceitas) => {
    const receitasPagasAtualizadas = dadosReceitas.filter(
      (receita) => receita.paga
    );
    const receitasNaoPagasAtualizadas = dadosReceitas.filter(
      (receita) => !receita.paga
    );
    setReceitasPagas(receitasPagasAtualizadas);
    setReceitasNaoPagas(receitasNaoPagasAtualizadas);

    const totalReceitasAtualizado = dadosReceitas.reduce(
      (sum, receita) => sum + (receita.valor || 0),
      0
    );
    setTotal(totalReceitasAtualizado);
  };

  // Carregar todas as receitas na montagem do componente
  useEffect(() => {
    const fetchReceitas = async () => {
      try {
        const { data } = await listarReceitas();
        setReceitas(data);
        atualizarListas(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchReceitas();
  }, []);

  // Carregar as categorias de receita na montagem do componente
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await listarCategoriasReceita();
        const dropDownCategoriaReceita = response.data.map((categoria) => ({
          key: categoria.id,
          text: categoria.descricaoCategoriaReceita,
          value: categoria.id,
        }));
        setListaCategoriaReceita(dropDownCategoriaReceita);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    };

    fetchCategorias();
  }, []);

  // Aplicar filtros
  const handleApplyFilters = async () => {
    const filtros = {
      nome,
      idCategoriaReceita: categoria,
      valor: valor !== "" ? parseFloat(valor) : null,
      dataDeCobranca,
    };

    try {
      const { data } = await filtrarReceitas(filtros);
      setReceitas(data);
      atualizarListas(data);
      notifySuccess("Filtros aplicados com sucesso!");
    } catch (error) {
      console.error("Erro ao filtrar receitas:", error);
      notifyError("Não foi possível aplicar os filtros.");
    }
  };

  // Limpar filtros e recarregar todas as receitas
  const handleResetFilters = async () => {
    setNome("");
    setCategoria("");
    setValor("");
    setDataDeCobranca("");
    try {
      const { data } = await listarReceitas();
      setReceitas(data);
      atualizarListas(data);
      notifySuccess("Filtros limpos com sucesso!");
    } catch (error) {
      console.error("Erro ao recarregar receitas:", error);
      notifyError("Não foi possível recarregar as receitas.");
    }
  };

  // Função para excluir receita
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
      }, 2000);
    } catch (error) {
      console.error("Erro ao excluir receita:", error);
      notifyError("Não foi possível excluir a receita.");
    }
  };

  // Abrir modal de confirmação (pagar ou excluir)
  const handleOpenModal = (id, action) => {
    setReceitaId(id);
    setActionType(action);
    setModalOpen(true);
  };

  const handleReceitaPaga = async () => {
    try {
      await receitaPaga(receitaId, true);
      setModalOpen(false);
      notifySuccess("Receita paga com sucesso!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Erro ao atualizar a receita:", error);
      notifyError(`Não foi possível atualizar a receita: ${error.message}`);
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
  };
  return (
    <>
      <Container className="container-bordered">
        <h1 className="containerHeader">Receitas</h1>
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
              Nova Receita
            </Button>
          </Menu.Item>
          <Menu.Item position="right">
            <div className="total-container">
              <strong>Total em Receitas: R$ </strong>
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
                    placeholder="Filtrar por Nome da Receita"
                    labelPosition="left"
                  />
                  <Form.Field className="dropCategoriaReceita">
                    <label>Categoria</label>
                    <Dropdown
                      fluid
                      selection
                      placeholder="Selecione"
                      options={listaCategoriaReceita}
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
                    label="Data"
                    placeholder="DD/MM/YYYY"
                    labelPosition="left"
                  />
                </Form.Group>
                <Button color="green" onClick={handleApplyFilters}>
                  Aplicar Filtros
                </Button>
                <Button color="red" onClick={handleResetFilters}>
                  Limpar Filtros
                </Button>
              </Form>
            </Segment>
          )}
        </Container>
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
                    <List.Content>
                      <List.Header>{receita.nome}</List.Header>
                      <List.Description>
                        {receita.categoriaReceita.descricaoCategoriaReceita} |
                        R$ {receita.valor.toFixed(2)} |{" "}
                        {new Date(
                          receita.dataDeCobranca + "T00:00:00"
                        ).toLocaleDateString()}
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
                        onClick={() => handleOpenModal(receita.id, "delete")}
                      >
                        <Icon name="trash" />
                      </Button>
                    </List.Content>
                    <List.Content>
                      <List.Header>{receita.nome}</List.Header>
                      <List.Description>
                        {receita.categoriaReceita.descricaoCategoriaReceita} |
                        R$ {receita.valor.toFixed(2)} |{" "}
                        {new Date(
                          receita.dataDeCobranca + "T00:00:00"
                        ).toLocaleDateString()}
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
          <ModalHeader
            icon={actionType === "delete" ? "trash" : "check"}
            content={
              actionType === "delete"
                ? "Excluir Receita"
                : "Confirmar Pagamento"
            }
          />
          <Modal.Content>
            <h4>
              {actionType === "delete"
                ? "Você tem certeza que deseja excluir esta receita?"
                : "Você realmente recebeu esta receita?"}
            </h4>
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
