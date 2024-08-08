import React, { useState, useEffect } from "react";
import { Button, Container, List } from "semantic-ui-react";
import { listarReceitas } from "../../../api/UserApi";
import Header from "../appMenu/AppMenu";
import "./ListaReceitas.css";
import { Link } from "react-router-dom/dist";

const ListaReceitas = () => {
  const [receitas, setReceitas] = useState([]);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getReceitas = async () => {
      try {
        const { data } = await listarReceitas();
        console.log("Receitas:", data);

        const receitasAgrupadas = data.reduce((acc, receita) => {
          const key = `${receita.descricao}-${receita.valor}`;
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

  const handleDelete = (key) => {
    setReceitas((prevReceitas) =>
      prevReceitas.filter(
        (receita) => `${receita.descricao}-${receita.valor}` !== key,
      ),
    );
  };

  const handleEdit = (key) => {
    console.log("Editar receita:", key);
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
            receitas.map((receita) => {
              const key = `${receita.descricao}-${receita.valor}`;
              return (
                <List.Item
                  key={key}
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
                        {receita.descricao}
                      </List.Header>
                      <List.Description
                        as="a"
                        inverted
                        className="list-description"
                      >
                        {`Valor: R$ ${receita.valor}`}
                      </List.Description>
                      <List.Description as="a" i className="list-description">
                        {`Vezes: ${receita.count}`}
                      </List.Description>
                    </div>
                    <div>
                      <Button
                        color="green"
                        onClick={() => handleEdit(key)}
                        className="edit-button"
                        style={{ marginRight: "10px" }}
                      >
                        Editar
                      </Button>
                      <Button
                        color="red"
                        onClick={() => handleDelete(key)}
                        className="delete-button"
                      >
                        Excluir
                      </Button>
                    </div>
                  </List.Content>
                </List.Item>
              );
            })
          )}
          <div className="totalReceitas">
            <p>Total: R$ {total}</p>
          </div>
        </List>
      </Container>
      <Button className="btnCadastrarReceita" as={Link} to="/novaReceita">
        Cadastrar Nova Receita
      </Button>
    </>
  );
};

export default ListaReceitas;
