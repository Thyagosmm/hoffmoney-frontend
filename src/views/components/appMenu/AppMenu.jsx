import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image, Menu } from "semantic-ui-react";
import logo from "../../../assets/logo.png";
import "./AppMenu.css"; // Importar o arquivo CSS

const AppMenu = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const nome = localStorage.getItem("nome");
    const email = localStorage.getItem("email");

    if (userId && nome && email) {
      setIsLogged(true);
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
            <>
              <Menu.Item>olá {localStorage.getItem("nome")}</Menu.Item>
              <Menu.Item onClick={logout}>Sair</Menu.Item>
            </>
          </Menu.Menu>
        </>
      )}
    </Menu>
  );
};

export default AppMenu;
