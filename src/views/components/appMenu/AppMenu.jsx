import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { consultarSaldo } from "../../../api/UserApi";
import "./AppMenu.css";

const AppMenu = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const nameParts = localStorage.getItem("nome");
    const email = localStorage.getItem("email");

    if (userId && nameParts && email) {
      setFirstName(nameParts.split(" ")[0]);
      setIsLogged(true);
      consultarSaldo(userId)
        .then((response) => {
          console.log("Saldo do usuário:", response.data);
          localStorage.setItem("saldo", response.data);
        })
        .catch((error) => {
          console.error(
            "Erro ao consultar saldo:",
            error.response ? error.response.data : error.message
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
    <section className="smart-scroll">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-md navbar-dark">
          <Link className="navbar-brand heading-black" to="/">
            HoffMoney
          </Link>
          <button
            className="navbar-toggler navbar-toggler-right border-0"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span data-feather="grid"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link page-scroll" href="#features">
                  Recursos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link page-scroll" href="#pricing">
                  Planos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link page-scroll" href="#faq">
                  FAQ
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link page-scroll" href="#blog">
                  Blog
                </a>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              {!isLogged ? (
                <li className="nav-item">
                  <Link
                    className="nav-link page-scroll d-flex flex-row align-items-center text-primary"
                    to="/login"
                  >
                    Entrar
                  </Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link page-scroll" to="/despesas">
                      Despesas
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link page-scroll" to="/receitas">
                      Receitas
                    </Link>
                  </li>
                  <li
                    className="nav-item dropdown"
                    onMouseEnter={toggleDropdown}
                    onMouseLeave={toggleDropdown}
                  >
                    <span className="nav-link dropdown-toggle">
                      <span>Bem-vindo, {firstName}!</span>
                      <span>
                        Seu saldo é R$
                        {localStorage.getItem("saldo")}
                      </span>
                    </span>
                    {isDropdownOpen && (
                      <div className="dropdown-menu show">
                        <Link className="dropdown-item nav-item" to="/update">
                          Editar Perfil
                        </Link>
                        <Link
                          className="dropdown-item nav-item"
                          to="/"
                          onClick={logout}
                        >
                          Sair
                        </Link>
                      </div>
                    )}
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default AppMenu;