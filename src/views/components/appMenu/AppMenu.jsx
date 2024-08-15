import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image, Menu, MenuItem } from "semantic-ui-react";
import logo from "../../../assets/logo.png";
import "./AppMenu.css"; // Importar o arquivo CSS
import { consultarSaldo } from "../../../api/UserApi";

const AppMenu = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const nameParts = localStorage.getItem("nome");
    const email = localStorage.getItem("email");
    
    if (userId && nameParts && email) {
      setFirstName(nameParts.split(" ")[0]); // Dividir o nome completo e pegar o primeiro nome
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
      <Menu.Item as={Link} to="/" className="homeLink" header>
        <Image size="mini" src={logo} />
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
          <Menu.Menu position="right" className="menu-container">
            <Menu.Item className="userInfo">
              <MenuItem className="basicInfo">
                <span>Bem-vindo, {firstName}!</span>
                <span className="span">
                  Seu saldo é R$ {localStorage.getItem("saldo")}
                </span>
              </MenuItem>
              <Menu.Item as={Link} to="/update" className="additional-info">
                Editar Perfil
              </Menu.Item>
              <Menu.Item as={Link} to="/saldo" className="additional-info">
                Editar Saldo
              </Menu.Item>
              <Menu.Item
                as={Link}
                to="/register"
                className="additional-info"
                onClick={logout}
              >
                Sair
              </Menu.Item>
            </Menu.Item>
          </Menu.Menu>
        </>
      )}
    </Menu>
  );
};

export default AppMenu;
