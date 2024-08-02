import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Icon, Image, Menu } from "semantic-ui-react";
import logo from "../../../assets/logo.png";

const Header = () => {
  
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
  };
    return (
      <div>
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item as={Link} to="/" header>
              <Image size="mini" src={logo} style={{ marginRight: "1.5em" }} />
              Hoffmoney
            </Menu.Item>
            <Menu.Item as={Link} to="/#services">
              Serviços
            </Menu.Item>
            <Menu.Item as={Link} to="/#testimonials">
              Depoimentos
            </Menu.Item>
            <Menu.Item as={Link} to="/#about">
              Sobre
            </Menu.Item>
            <Menu.Item as={Link} to="/#contact">
              Contato
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item>
                <Icon name="search" />
              </Menu.Item>
              {!isLogged ? (
                <>
                  <Menu.Item as={Link} to="/login">
                    Login
                  </Menu.Item>
                  <Menu.Item as={Link} to="/register">
                    Registrar-se
                  </Menu.Item>
                </>
              ) : (
                <Menu.Item>olá {localStorage.getItem("nome")}</Menu.Item>
              )}
              <Menu.Item onClick={logout}>Sair</Menu.Item>}
            </Menu.Menu>
          </Container>
        </Menu>
      </div>
    );
}

export default Header;
