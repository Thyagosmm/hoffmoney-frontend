import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Form,
  Message,
  Modal,
  Progress,
} from "semantic-ui-react";
import { login } from "../../../api/UserApi";
import "./FormLogin.css";
import Info from "../../components/info/Info";

export default function FormLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [progress, setProgress] = useState(0);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      showModal("Todos os campos são obrigatórios.");
      return;
    }

    if (!isEmailValid) {
      showModal("Email inválido.");
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
        setSuccess("Login realizado com sucesso!");
        setError("");
        showModal("Login realizado com sucesso!");
        console.log("Dados salvos no localStorage:");
        console.log("userId:", localStorage.getItem("userId"));
        console.log("nome:", localStorage.getItem("nome"));
        console.log("email:", localStorage.getItem("email"));
        window.location.href = "/";
      } else {
        console.error("Error logging in user:", data);
        if (data.response && data.status === 401) {
          showModal("Credenciais inválidas. Por favor, tente novamente.");
        } else {
          showModal(
            "Erro ao fazer login. Por favor, tente novamente mais tarde.",
          );
        }
        setSuccess("");
      }
    } catch (error) {
      console.error("Error logging in user:", error);
      if (error.response && error.response.status === 400) {
        showModal("Credenciais inválidas. Por favor, tente novamente.");
      } else {
        showModal(
          "Erro ao fazer login. Por favor, tente novamente mais tarde.",
        );
      }
      setSuccess("");
    }
  };
  const showModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setIsModalOpen(false);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 40); // Ajuste o tempo conforme necessário
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
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
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
      <Modal
        className="modal-container"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <Modal.Header className="modal-header ">Aviso</Modal.Header>
        <Modal.Content className="modal-content">
          <p className="modal-message">{modalMessage}</p>
          <Progress className="progress" percent={progress} indicating />
        </Modal.Content>
      </Modal>
    </div>
  );
}
