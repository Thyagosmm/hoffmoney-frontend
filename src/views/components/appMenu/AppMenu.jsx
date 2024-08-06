import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image, Menu } from "semantic-ui-react";
import logo from "../../../assets/logo.png";
import "./AppMenu.css"; // Importar o arquivo CSS
import { consultarSaldo } from "../../../api/UserApi";

const AppMenu = () => {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const nome = localStorage.getItem("nome");
    const email = localStorage.getItem("email");

    if (userId && nome && email) {
      setIsLogged(true);

      consultarSaldo(userId)
        .then((response) => {
          console.log("Saldo do usuário:", response.data);
          localStorage.setItem("saldo", response.data);
        })
        .catch((error) => {
          console.error(
            "Erro ao consultar saldo:",
            error.response ? error.response.data : error.message,
          );
        });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("nome");
    localStorage.removeItem("email");
    setIsLogged(false);
    window.location.href = "/";
  };

  return (
    <Menu inverted className="menu">
      <Menu.Item as={Link} to="/" header>
        <Image size="mini" src={logo} style={{ marginRight: "1.5em" }} />
        Hoffmoney
      </Menu.Item>
      {!isLogged ? (
        <Menu.Menu position="right">
          <>
            <Menu.Item className="rote" as={Link} to="/login">
              Login
            </Menu.Item>
            <Menu.Item className="rote" as={Link} to="/register">
              Registrar-se
            </Menu.Item>
          </>
        </Menu.Menu>
      ) : (
        <>
          <Menu.Item className="rote" as={Link} to="/despesas">
            Despesas
          </Menu.Item>
          <Menu.Item className="rote" as={Link} to="/receitas">
            Receitas
          </Menu.Item>
          <Menu.Menu position="right">
            <div className="userInfo">
              <Menu.Item className="userInfo">
                olá {localStorage.getItem("nome")}
              </Menu.Item>
              <Menu.Item className="userInfo">
                Seu saldo é R$ {localStorage.getItem("saldo")}
              </Menu.Item>
            </div>
            <>
              <Menu.Item onClick={logout}>Sair</Menu.Item>
            </>
          </Menu.Menu>
        </>
      )}
    </Menu>
  );
};

export default AppMenu;
