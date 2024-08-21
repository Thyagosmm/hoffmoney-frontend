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
      const data = await login(email, senha);
      console.log("Dados recebidos da função login:", data);

      if (data && Object.keys(data).length > 0) {
        console.log("Usuário logado com sucesso:", data);
        localStorage.setItem("userId", data.id);
        localStorage.setItem("nome", data.nome);
        localStorage.setItem("email", data.email);
        localStorage.setItem("saldo", data.saldo);

        console.log("Dados salvos no localStorage:");
        console.log("userId:", localStorage.getItem("userId"));
        console.log("nome:", localStorage.getItem("nome"));
        console.log("email:", localStorage.getItem("email"));
        console.log("saldo:", localStorage.getItem("saldo"));
        notifySuccess("Login realizado com sucesso!");
        window.location.href = "/";
      } else {
        console.error("Error logging in user:", data);
        if (data.response && data.status === 401) {
          notifyWarn("Credenciais inválidas. Por favor, tente novamente.");
        } else {
          notifyError(
            "Erro ao fazer login. Por favor, tente novamente mais tarde.",
          );
        }
      }
    } catch (error) {
      console.error("Error logging in user:", error);
      if (error.response && error.response.status === 400) {
        notifyError("Credenciais inválidas. Por favor, tente novamente.");
      } else {
        notifyError(
          "Erro ao fazer login. Por favor, tente novamente mais tarde.",
        );
      }
    }
  };

  const handleEmailChange = (e) => {
    console.log("Email:", e.target.value);
    const emailValue = e.target.value;
    setEmail(emailValue);
    // Chamar a função de validação
    setIsEmailValid(validateEmail(emailValue));
  };

  // Definir uma função de validação
  const validateEmail = (email) => {
    const re =
      /^(([^<>().,;:\s@"]+(\.[^<>().,;:\s@"]+)*)|(".+"))@(([^<>.,;:\s@"]+\.)+[^<>.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div className="login-container">
      <Info />
      <Container className="login-right" textAlign="center">
        <h2>Faça login na sua conta</h2>
        <div className="form-container">
          <Form>
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
            <Button className="login-button" onClick={handleLogin}>
              Entrar
            </Button>
          </Form>
        </div>
        <Divider />
        <div className="footer">
          <p>Ou não tem conta aqui? </p>
          <Link className="footer-link" to="/register">
            Criar conta
          </Link>
        </div>
      </Container>
    </div>
  );
}
