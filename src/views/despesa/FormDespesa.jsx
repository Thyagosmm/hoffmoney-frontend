import React, { useState, useEffect } from "react";
import { Button, Container, List, Dropdown } from "semantic-ui-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./FormDespesa.css";
import {
    listarDespesas,
  registrarDespesa,
  atualizarDespesa,
  deletarDespesa,
  buscarDespesaPorId,
} from "../../api/UserApi";
import Header from "../components/appMenu/AppMenu";
import { Link } from "react-router-dom/dist";

const ListaDespesas = () => {
  const [despesas, setDespesas] = useState([]);
  const [filteredDespesas, setFilteredDespesas] = useState([]);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

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
        setFilteredDespesas(despesasAgrupadasList);
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

  useEffect(() => {
    filterDespesas();
  }, [selectedMonth, selectedYear]);

  const months = [
    { key: "01", text: "Janeiro", value: "01" },
    { key: "02", text: "Fevereiro", value: "02" },
    { key: "03", text: "Março", value: "03" },
    { key: "04", text: "Abril", value: "04" },
    { key: "05", text: "Maio", value: "05" },
    { key: "06", text: "Junho", value: "06" },
    { key: "07", text: "Julho", value: "07" },
    { key: "08", text: "Agosto", value: "08" },
    { key: "09", text: "Setembro", value: "09" },
    { key: "10", text: "Outubro", value: "10" },
    { key: "11", text: "Novembro", value: "11" },
    { key: "12", text: "Dezembro", value: "12" },
  ];

  const years = [
    { key: "2022", text: "2022", value: "2022" },
    { key: "2023", text: "2023", value: "2023" },
    { key: "2024", text: "2024", value: "2024" },
  ];

  const filterDespesas = () => {
    const filtered = despesas.filter((despesa) => {
      const despesaDate = new Date(despesa.data);
      const despesaMonth = despesaDate.getMonth() + 1;
      const despesaYear = despesaDate.getFullYear();

      return (
        (selectedMonth ? despesaMonth === parseInt(selectedMonth) : true) &&
        (selectedYear ? despesaYear === parseInt(selectedYear) : true)
      );
    });

    setFilteredDespesas(filtered);
    const totalFilteredDespesas = filtered.reduce((sum, despesa) => {
      return sum + despesa.valor * despesa.count;
    }, 0);
    setTotal(totalFilteredDespesas);
  };

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
        <h1 className="containerHeader">Despesas</h1>
        <div className="filter-container">
          <Dropdown
            placeholder="Selecione o Mês"
            selection
            options={months}
            onChange={(e, data) => setSelectedMonth(data.value)}
          />
          <Dropdown
            placeholder="Selecione o Ano"
            selection
            options={years}
            onChange={(e, data) => setSelectedYear(data.value)}
          />
        </div>
        <List divided inverted relaxed className="listDespesas">
          {filteredDespesas.length === 0 ? (
            <div>Nenhuma despesa encontrada.</div>
          ) : (
            filteredDespesas.map((despesa) => {
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