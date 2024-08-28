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
} from "semantic-ui-react";
import Header from "../../views/components/appMenu/AppMenu";
import "./ListaCategoriaDespesa.css";
import { notifyError, notifySuccess } from "../utils/Utils";
import { deletarCategoriaDespesa } from '../../api/UserApi';

const ListaCategoriaDespesa = () => {
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [categoriaToEdit, setCategoriaToEdit] = useState(null);
  const [actionType, setActionType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getCategorias = async () => {
      try {
        const response = await axios.get("http://localhost:8085/api/categoriadespesa");
        setCategorias(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    getCategorias();
  }, []);

  const handleDelete = async () => {
    try {
      await deletarCategoriaDespesa(categoriaToEdit);
      setCategorias((prevCategorias) =>
        prevCategorias.filter((categoria) => categoria.id !== categoriaToEdit)
      );
      setModalOpen(false);
      notifySuccess("Categoria deletada com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);
      notifyError("Não foi possível excluir a categoria.");
    }
  };

  const handleOpenModal = (id, action) => {
    setCategoriaToEdit(id);
    setActionType(action);
    setModalOpen(true);
  };

  const handleEdit = (id) => {
    navigate(`/editarcategoriadespesa/${id}`);
  };

  const handleCreateNew = () => {
    navigate("/novacategoriadespesa");
  };

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <>
      <Header />
      <Container className="container-bordered">
        <h1 className="containerHeader">Categorias de Despesas</h1>
        <Menu>
          <Menu.Item position="left">
            <Button
              className="form-button"
              icon
              color="green"
              onClick={handleCreateNew}
            >
              <Icon name="plus" />
              Nova Categoria
            </Button>
          </Menu.Item>
        </Menu>
        <Segment className="segment-categorias">
          <Menu>
            <List divided verticalAlign="middle">
              {categorias.length > 0 ? (
                categorias.map((categoria) => (
                  <List.Item className="items-lista" key={categoria.id}>
                    <List.Content floated="right">
                      <Button
                        icon
                        color="blue"
                        onClick={() => handleEdit(categoria.id)}
                      >
                        <Icon name="edit" />
                      </Button>
                      <Button
                        icon
                        color="red"
                        onClick={() => handleOpenModal(categoria.id, "delete")}
                      >
                        <Icon name="trash" />
                      </Button>
                    </List.Content>
                    <Icon name="tags" size="large" color="teal" />
                    <List.Content>
                      <List.Header>{categoria.nome}</List.Header>
                      <List.Description>
                        {categoria.descricaoDespesa}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                ))
              ) : (
                <span>Nenhuma categoria encontrada.</span>
              )}
            </List>
          </Menu>
        </Segment>

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
                ? "Excluir Categoria"
                : "Confirmar Ação"
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
            <Button
              color="green"
              onClick={handleDelete}
            >
              <Icon name="checkmark" /> Sim
            </Button>
          </Modal.Actions>
        </Modal>
      </Container>
    </>
  );
};

export default ListaCategoriaDespesa;
