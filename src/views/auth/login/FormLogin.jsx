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
  const [isEmailValid, setIsEmailValid] = useState(true);
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
      const response = await login({ email, senha: senha });
      console.log("User logged in:", response.data);
      setSuccess("Login realizado com sucesso!");
      setError("");
      showModal("Login realizado com sucesso!");
      // Redirecionar ou limpar campos...
    } catch (error) {
      console.error("Error logging in user:", error);
      if (error.response && error.response.status === 401) {
        showModal("Credenciais inválidas. Por favor, tente novamente.");
      } else {
        showModal(
          "Usuario não encontrado, verifique seus dados ou crie uma conta",
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

  return (
    <div className="login-container">
      <Info />
      <div className="login-right">
        <Container textAlign="center">
          <h2>Faça login na sua conta</h2>
          <div className="form-container">
            <Form>
              <Form.Field className="form-field">
                <label>Email</label>
                <input
                  className="input-field"
                  type="email"
                  placeholder="Digite seu e-mail..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {!isEmailValid && (
                  <Message className="inputError" negative>
                    Email inválido.
                  </Message>
                )}
              </Form.Field>
              <Form.Field className="form-field">
                <label>Senha</label>
                <input
                  className="input-field"
                  type="password"
                  placeholder="Digite sua senha..."
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
                <div className="forgot-senha">
                  <Link to="/forget">Esqueci minha senha</Link>
                </div>
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
