import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Form, Message } from "semantic-ui-react";
import { registerUser } from "../../../../api/UserApi";
import Info from "../../../components/info/Info";
import { notifyError, notifySuccess } from "../../../utils/Utils";
import "./FormUsuarioRegister.css";

const FormUsuarioRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [charsRemaining, setCharsRemaining] = useState(8);

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsEmailValid(validateEmail(emailValue));
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  };

  const verificarSenha = (password) => {
    const criterios = {
      comprimento: password.length >= 8,
    };

    return criterios;
  };

  const calcularCaracteresRestantes = (password) => {
    return 8 - password.length;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const resultado = verificarSenha(newPassword);
    setCharsRemaining(calcularCaracteresRestantes(newPassword));
    console.log(resultado); 
    console.log(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      notifyError("Todos os campos são obrigatórios.");
      return;
    }

    if (!isEmailValid) {
      notifyError("Email inválido.");
      return;
    }

    if (charsRemaining > 0) {
      notifyError("Senha deve ter pelo menos 8 caracteres.");
      return;
    }

    try {
      const response = await registerUser({
        nome: name,
        email,
        senha: password,
      });
      console.log("User registered:", response.data);
      notifySuccess("Usuário registrado com sucesso!");
      setTimeout(() => (window.location.href = "/login"), 1500);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.error("Error registering user:", error);
        notifyError(error.response.data);
      }
    }
  };

  return (
    <div className="page-container">
      <Info />
      <Container className="form-right" textAlign="center">
        <h2>Criar Conta</h2>
        <Form className="form-container">
          <Form.Field className="form-field">
            <label>Nome</label>
            <input
              className="input-field"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Field>
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
              className="input-field"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Field>
          <Form.Field className="form-field">
            <label className="label-input">
              Senha
              {charsRemaining > 0 ? (
                <Message className="inputError" negative>
                  Faltam {charsRemaining} caracteres
                </Message>
              ) : (
                <Message className="inputSuccess" positive>
                  Senha válida
                </Message>
              )}
            </label>
            <input
              className="input-field"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Field>
          <Button className="form-button" onClick={handleRegister}>
            Cadastrar-se
          </Button>
        </Form>
        <Divider />
        <div className="footer">
          <p>Ou já tem uma conta?</p>
          <Link className="footer-link" to="/login">
            Login
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default FormUsuarioRegister;