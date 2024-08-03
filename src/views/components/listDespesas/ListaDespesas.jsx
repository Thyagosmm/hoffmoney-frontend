import React, { useState, useEffect } from "react";
import { Button, Container, List } from "semantic-ui-react";
import { listarDespesas } from "../../../api/UserApi";
import Header from "../appMenu/AppMenu";

const ListaDespesas = () => {
  const [despesas, setDespesas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDespesas = async () => {
      try {
        const data = await listarDespesas();
        console.log("Despesas:", data); // Verificar se os dados estão sendo retornados corretamente

        // Agrupar despesas por descrição e valor e contar as ocorrências
        const despesasAgrupadas = data.data.reduce((acc, despesa) => {
          const key = `${despesa.descricao}-${despesa.valor}`;
          if (!acc[key]) {
            acc[key] = { ...despesa, count: 1 };
          } else {
            acc[key].count += 1;
          }
          return acc;
        }, {});

        // Converter o objeto de agrupamento em uma lista
        const despesasAgrupadasList = Object.values(despesasAgrupadas);

        setDespesas(despesasAgrupadasList);
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
    // Lógica para editar a despesa
    console.log("Editar despesa:", key);
  };

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <>
      <Header />
      <Container className="container">
        <List divided relaxed className="list">
          {despesas.length === 0 ? (
            <div>Nenhuma despesa encontrada.</div>
          ) : (
            despesas.map((despesa) => {
              console.log("Despesa item:", despesa); // Verificar cada item de despesa
              const key = `${despesa.descricao}-${despesa.valor}`;
              return (
                <List.Item
                  key={key}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <List.Icon
                    name="money"
                    size="large"
                    verticalAlign="middle"
                    className="list-icon"
                  />
                  <List.Content
                    className="list-content"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <List.Header as="a" className="list-header">
                        {despesa.descricao}
                      </List.Header>
                      <List.Description
                        as="a"
                        className="list-description"
                      >{`Valor: ${despesa.valor}`}</List.Description>
                      <List.Description
                        as="a"
                        className="list-description"
                      >{`Vezes: ${despesa.count}`}</List.Description>
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
        </List>
      </Container>
    </>
  );
};

export default ListaDespesas;
