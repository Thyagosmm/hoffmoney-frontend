import React, { useState, useEffect } from "react";
import { Button, Container, List, Modal, Header as SemanticHeader } from "semantic-ui-react";
import { listarReceitas, deletarReceita } from "../../api/UserApi";
import Header from "../../views/components/appMenu/AppMenu";
import "./ListaReceitas.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ListaReceitas = () => {
  const [receitas, setReceitas] = useState([]);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [receitaToDelete, setReceitaToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getReceitas = async () => {
      try {
        const { data } = await listarReceitas();
        console.log("Receitas:", data);

        const receitasAgrupadas = data.reduce((acc, receita) => {
          const key = receita.id; // Mudei para usar o ID
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
    const usuarioId = localStorage.getItem("userId"); // Obtenha o ID do usuário do localStorage
    if (!usuarioId) {
      console.error("Usuário não autenticado.");
      return;
    }

    try {
      await deletarReceita(usuarioId, receitaToDelete); // Passe o ID da receita e o ID do usuário
      setReceitas((prevReceitas) =>
        prevReceitas.filter((receita) => receita.id !== receitaToDelete), // Filtra pelo ID
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
        <List divided inverted relaxed className="listReceitas">
          {receitas.length === 0 ? (
            <div>Nenhuma receita encontrada.</div>
          ) : (
            receitas.map((receita) => (
              <List.Item
                key={receita.id} // Use o ID como chave
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
                    <List.Header as="a">
                      Nome: {receita.nome}
                    </List.Header>
                    <List.Description as="a" inverted className="list-description">
                      Valor: R$ {receita.valor}
                    </List.Description>
                    <List.Description as="a" className="list-description">
                      Descrição: {receita.descricao}
                    </List.Description>
                  </div>
                  <div>
                    <Button
                      color="green"
                      onClick={() => handleEdit(receita.id)}
                      className="edit-button"
                      style={{ marginRight: "10px" }}
                    >
                      Editar
                    </Button>
                    <Button
                      color="red"
                      onClick={() => handleOpenModal(receita.id)} // Passe o ID da receita
                      className="delete-button"
                    >
                      Excluir
                    </Button>
                  </div>
                </List.Content>
              </List.Item>
            ))
          )}
          <div className="totalReceitas">
            <p>Total: R$ {total}</p>
          </div>
        </List>
      </Container>
      <Button className="btnCadastrarReceita" as={Link} to="/novaReceita">
        Cadastrar Nova Receita
      </Button>

      {/* Modal de Confirmação */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        size="mini"
      >
        <SemanticHeader icon="archive" content="Excluir Receita" />
        <Modal.Content>
          <p>Você tem certeza que deseja excluir esta receita?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setModalOpen(false)}>
            Não
          </Button>
          <Button
            color="green"
            onClick={handleDelete}
          >
            Sim
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default ListaReceitas;
