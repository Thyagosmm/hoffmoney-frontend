import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Icon,
  List,
  Menu,
  Segment,
  Modal,
  Header as SemanticHeader,
  ModalHeader,
} from "semantic-ui-react";
import Header from "../components/appMenu/AppMenu";
import "./ListaCategorias.css";
import { notifyError, notifySuccess } from "../utils/Utils";
import {
  deletarCategoriaReceita,
  deletarCategoriaDespesa,
} from "../../api/UserApi";

const ListaCategorias = () => {
  const [categoriasReceita, setCategoriasReceita] = useState([]);
  const [categoriasDespesa, setCategoriasDespesa] = useState([]);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [categoriaToEdit, setCategoriaToEdit] = useState(null);
  const [actionType, setActionType] = useState("");
  const [categoriaType, setCategoriaType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getCategoriasReceita = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8085/api/categoriareceita",
        );
        setCategoriasReceita(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    const getCategoriasDespesa = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8085/api/categoriadespesa",
        );
        setCategoriasDespesa(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    getCategoriasReceita();
    getCategoriasDespesa();
  }, []);

  const handleDelete = async () => {
    try {
      if (categoriaType === "receita") {
        await deletarCategoriaReceita(categoriaToEdit);
        setCategoriasReceita((prevCategorias) =>
          prevCategorias.filter(
            (categoria) => categoria.id !== categoriaToEdit,
          ),
        );
      } else {
        await deletarCategoriaDespesa(categoriaToEdit);
        setCategoriasDespesa((prevCategorias) =>
          prevCategorias.filter(
            (categoria) => categoria.id !== categoriaToEdit,
          ),
        );
      }
      setModalOpen(false);
      notifySuccess("Categoria deletada com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);
      notifyError("Não foi possível excluir a categoria.");
    }
  };

  const handleOpenModal = (id, action, type) => {
    setCategoriaToEdit(id);
    setActionType(action);
    setCategoriaType(type);
    setModalOpen(true);
  };

  const handleEdit = (id, type) => {
    if (type === "receita") {
      navigate(`/editarcategoriareceita/${id}`);
    } else {
      navigate(`/editarcategoriadespesa/${id}`);
    }
  };

  const handleCreateNew = (type) => {
    if (type === "receita") {
      navigate("/novacategoriareceita");
    } else {
      navigate("/novacategoriadespesa");
    }
  };

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div className="categorias-page">
      <h1 className="containerHeader">Categorias</h1>
      <div className="categorias-container">
        <Container className="container-bordered">
          <Segment className="segment-categorias">
            <h2>Categorias de Despesas</h2>
            <Menu>
              <Menu.Item position="left">
                <Button
                  className="form-button"
                  icon
                  color="green"
                  onClick={() => handleCreateNew("despesa")}
                >
                  <Icon name="plus" />
                  Criar Nova
                </Button>
              </Menu.Item>
            </Menu>
            <div className="lista-categoria-div">
              <List divided verticalAlign="middle">
                {categoriasDespesa.length > 0 ? (
                  categoriasDespesa.map((categoria) => (
                    <List.Item fluid className="items-lista" key={categoria.id}>
                      <List.Content floated="right">
                        <Button
                          icon
                          color="blue"
                          onClick={() => handleEdit(categoria.id, "despesa")}
                        >
                          <Icon name="edit" />
                        </Button>
                        <Button
                          icon
                          color="red"
                          onClick={() =>
                            handleOpenModal(categoria.id, "delete", "despesa")
                          }
                        >
                          <Icon name="trash" />
                        </Button>
                      </List.Content>
                      <List.Content>
                        <Icon name="tags" size="large" color="teal" />
                        <List.Description>
                          <h5 className="descricao-categoria">
                            {categoria.descricaoCategoriaDespesa}
                          </h5>
                        </List.Description>
                      </List.Content>
                    </List.Item>
                  ))
                ) : (
                  <h4>Nenhuma categoria encontrada.</h4>
                )}
              </List>
            </div>
          </Segment>
        </Container>
        <Container className="container-bordered">
          <Segment className="segment-categorias">
            <h2>Categorias de Receitas</h2>
            <Menu>
              <Menu.Item position="left">
                <Button
                  className="form-button"
                  icon
                  color="green"
                  onClick={() => handleCreateNew("receita")}
                >
                  <Icon name="plus" />
                  Criar Nova
                </Button>
              </Menu.Item>
            </Menu>
            <div className="lista-categoria-div">
              <List divided verticalAlign="middle">
                {categoriasReceita.length > 0 ? (
                  categoriasReceita.map((categoria) => (
                    <List.Item fluid className="items-lista" key={categoria.id}>
                      <List.Content floated="right">
                        <Button
                          icon
                          color="blue"
                          onClick={() => handleEdit(categoria.id, "receita")}
                        >
                          <Icon name="edit" />
                        </Button>
                        <Button
                          icon
                          color="red"
                          onClick={() =>
                            handleOpenModal(categoria.id, "delete", "receita")
                          }
                        >
                          <Icon name="trash" />
                        </Button>
                      </List.Content>
                      <List.Content>
                        <Icon name="tags" size="large" color="teal" />
                        <List.Description>
                          <h5 className="descricao-categoria">
                            {categoria.descricaoCategoriaReceita}
                          </h5>
                        </List.Description>
                      </List.Content>
                    </List.Item>
                  ))
                ) : (
                  <h4>Nenhuma categoria encontrada.</h4>
                )}
              </List>
            </div>
          </Segment>
        </Container>
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
            actionType === "delete" ? "Excluir Categoria" : "Confirmar Ação"
          }
        />
        <Modal.Content>
          <span>
            {actionType === "delete"
              ? "Você tem certeza que deseja excluir esta categoria?"
              : "Você realmente deseja realizar esta ação?"}
          </span>
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
    </div>
  );
};

export default ListaCategorias;
