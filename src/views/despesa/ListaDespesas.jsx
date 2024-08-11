import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  List,
  Modal,
  Header as SemanticHeader,
} from "semantic-ui-react";
import { listarDespesas, deletarDespesa } from "../../api/UserApi";
import Header from "../components/appMenu/AppMenu";
import "./ListaDespesas.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ListaDespesas = () => {
  const [despesas, setDespesas] = useState([]);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [despesaToDelete, setDespesaToDelete] = useState(null);
  const navigate = useNavigate();

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

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <>
      <Header />
      <Container className="despesas">
        <h1 className="containerHeader">Despesas</h1>
        <List divided inverted relaxed className="listDespesas">
          {despesas.length === 0 ? (
            <div>Nenhuma despesa encontrada.</div>
          ) : (
            despesas.map((despesa) => (
              <List.Item
                key={despesa.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                className="list-item"
              >
                <List.Icon name="money" className="list-icon" inverted />
                <List.Content
                  className="list-content"
                  inverted
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <List.Header as="a" inverted className="list-header">
                      {despesa.descricao}
                    </List.Header>
                    <List.Description
                      as="a"
                      inverted
                      className="list-description"
                    >
                      {`Valor: R$ ${despesa.valor}`}
                    </List.Description>
                    <List.Description as="a" className="list-description">
                      {`Vezes: ${despesa.count}`}
                    </List.Description>
                  </div>
                  <div>
                    <Button
                      color="green"
                      onClick={() => handleEdit(despesa.id)}
                      className="edit-button"
                      style={{ marginRight: "10px" }}
                    >
                      Editar
                    </Button>
                    <Button
                      color="red"
                      onClick={() => handleOpenModal(despesa.id)}
                      className="delete-button"
                    >
                      Excluir
                    </Button>
                  </div>
                </List.Content>
              </List.Item>
            ))
          )}
          <div className="totalDespesas">
            <p>Total: R$ {total}</p>
          </div>
        </List>
      </Container>
      <Button className="btnCadastrarDespesa" as={Link} to="/novaDespesa">
        Cadastrar Nova Despesa
      </Button>

      {/* Modal de Confirmação */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} size="mini">
        <SemanticHeader icon="archive" content="Excluir Despesa" />
        <Modal.Content>
          <p>Você tem certeza que deseja excluir esta despesa?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setModalOpen(false)}>
            Não
          </Button>
          <Button color="green" onClick={handleDelete}>
            Sim
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default ListaDespesas;
