import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Form, Message } from "semantic-ui-react";
import { login } from "../../../api/UserApi";
import "./FormLogin.css";
import Info from "../../components/info/Info";
import { notifyError, notifySuccess, notifyWarn } from "../../utils/Utils";
export default function FormLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      notifyWarn("Todos os campos são obrigatórios.");
      return;
    }

    if (!isEmailValid) {
      notifyWarn("Email inválido.");
      return;
    }

    try {
      const response = await login(email, senha);

      if (response && Object.keys(response).length > 0) {
        localStorage.setItem("userId", response.id);
        localStorage.setItem("nome", response.nome);
        localStorage.setItem("email", response.email);
        localStorage.setItem("saldo", response.saldo);
        notifySuccess("Login realizado com sucesso!");
        window.location.href = "/";
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Error registering user:", error);
        notifyError(error.response.data);
      }
    }
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsEmailValid(validateEmail(emailValue));
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>().,;:\s@"]+(\.[^<>().,;:\s@"]+)*)|(".+"))@(([^<>.,;:\s@"]+\.)+[^<>.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div className="page-container">
      <Info />
      <Container className="form-right" textAlign="center">
        <h2>Faça login na sua conta</h2>
        <Form className="form-container">
          <Form.Field className="form-field">
            <label className="label-input">
              Email
              {!isEmailValid ? (
                <Message className="inputError" negative>
                  Email inválido.
                </Message>
              ) : (
                <Message className="inputSuccess" positive>
                  Email válido
                </Message>
              )}
            </label>
            <input
              ref={emailRef}
              className="input-field"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Field>
          <Form.Field className="form-field">
            <label>Senha</label>
            <input
              ref={passwordRef}
              className="input-field"
              type="password"
              placeholder="Digite sua senha..."
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </Form.Field>
          <Link to="/forget" className="forgot-link">
            Esqueceu a senha?
          </Link>
          <Button className="form-button" onClick={handleLogin}>
            Entrar
          </Button>
        </Form>
        <Divider />
        <div className="footer">
          <p>Ainda não tem conta aqui? </p>
          <Link className="footer-link" to="/register">
            Criar conta
          </Link>
        </div>
      </Container>
    </div>
  );
}
