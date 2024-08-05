import React, { useState, useEffect } from "react";
import { Button, Container, List } from "semantic-ui-react";
import { listarDespesas } from "../../../api/UserApi";
import Header from "../appMenu/AppMenu";
import "./ListaDespesas.css";
import { Link } from "react-router-dom/dist";

const ListaDespesas = () => {
  const [despesas, setDespesas] = useState([]);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getDespesas = async () => {
      try {
        const { data } = await listarDespesas();
        console.log("Despesas:", data);

        const despesasAgrupadas = data.reduce((acc, despesa) => {
          const key = `${despesa.descricao}-${despesa.valor}`;
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

  const handleDelete = (key) => {
    setDespesas((prevDespesas) =>
      prevDespesas.filter(
        (despesa) => `${despesa.descricao}-${despesa.valor}` !== key,
      ),
    );
  };

  const handleEdit = (key) => {
    console.log("Editar despesa:", key);
  };

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <>
      <Header />
      <Container className="despesas">
        <List divided inverted relaxed className="listDespesas">
          {despesas.length === 0 ? (
            <div>Nenhuma despesa encontrada.</div>
          ) : (
            despesas.map((despesa) => {
              const key = `${despesa.descricao}-${despesa.valor}`;
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
                  <List.Icon
                    name="money"
                    className="list-icon"
                    inverted
                  />
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
                      <List.Description as="a" inverted className="list-description">
                        {`Valor: R$ ${despesa.valor}`}
                      </List.Description>
                      <List.Description as="a" i className="list-description">
                        {`Vezes: ${despesa.count}`}
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
          <div className="totalDespesas">
            <p>Total:R$ {total}</p>
          </div>
        </List>
      </Container>
      <Button className="btnCadastrarDespesa" as={Link} to="/novaDespesa">
        Cadastrar Nova Despesa
      </Button>
    </>
  );
};

export default ListaDespesas;
