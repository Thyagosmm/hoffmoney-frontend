import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { consultarSaldo, getUser } from "../../../api/UserApi";
import "./AppMenu.css";
import logo from "../../../assets/logo.png";
import { notifyError } from "../../utils/Utils";

const AppMenu = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRelatorioOpen, setIsRelatorioOpen] = useState(false);

  const [saldo, setSaldo] = useState(0);
  const [limiteGastos, setLimiteGastos] = useState(0);
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleRelarotio = () => {
    setIsRelatorioOpen(!isRelatorioOpen);
  };
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const nameParts = localStorage.getItem("nome");
    const email = localStorage.getItem("email");

    if (userId && nameParts && email) {
      setFirstName(nameParts.split(" ")[0]);
      setIsLogged(true);
      getUser(userId)
        .then((response) => {
          setLimiteGastos(response.data.limite);
        })
        .catch((error) => {
          console.error("Erro ao buscar dados do usuário:", error);
        });
      consultarSaldo(userId)
        .then((response) => {
          setSaldo(response.data);
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

  const verificarLimite = (rota) => {
    if (limiteGastos > 0) {
      navigate(rota);
    } else {
      setModalOpen(true);
      notifyError("Você precisa definir um limite de gasto mensal!");
    }
  };

  return (
    <section className="smart-scroll">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-md navbar-dark">
          <Link className="navbar-brand heading-black" to="/">
            <img
              className="logo-menu"
              src={logo}
              alt="Logo da Empresa HoffMoney"
            />
            <span>HoffMoney</span>
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
            {!isLogged ? (
              <>
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <a className="nav-link page-scroll" href="#features">
                      Recursos
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link page-scroll" href="#about">
                      Descrição
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
              </>
            ) : null}

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
                  <li
                    className="nav-item dropdown"
                    onMouseEnter={toggleRelarotio}
                    onMouseLeave={toggleRelarotio}
                  >
                    <span className="nav-link dropdown-toggle">Relatórios</span>
                    {isRelatorioOpen && (
                      <div className="dropdown-menu show">
                        <Link
                          className="dropdown-item nav-item"
                          to="/pdfreceitas"
                        >
                          Receitas
                        </Link>
                        <Link
                          className="dropdown-item nav-item"
                          to="/pdfdespesas"
                        >
                          Despesas
                        </Link>
                        <Link
                          className="dropdown-item nav-item"
                          to="/pdfcompleto"
                        >
                          Completo
                        </Link>
                      </div>
                    )}
                  </li>
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
                  <li className="nav-item">
                    <Link className="nav-link page-scroll" to="/categorias">
                      Categorias
                    </Link>
                  </li>
                  <li
                    className="nav-item dropdown"
                    onMouseEnter={toggleDropdown}
                    onMouseLeave={toggleDropdown}
                  >
                    <span className="nav-link dropdown-toggle">
                      <span>Bem-vindo, {firstName}!</span>
                      <span>Seu saldo é R$ {saldo}</span>
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
