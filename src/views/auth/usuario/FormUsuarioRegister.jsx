import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Form, Message } from "semantic-ui-react";
import { registerUser } from "../../../api/UserApi";
import "./FormUsuarioRegister.css";
import Info from "../../components/info/Info";

const FormUsuarioRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [charsRemaining, setCharsRemaining] = useState(8);

  // Função para exibir o popup
  const showPopup = () => {
    setIsPopupVisible(true);
    // Esconder o popup após X segundos
    setTimeout(() => (window.location.href = "/"), 5000);
  };

  const handleEmailChange = (e) => {
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

  // Função para verificar a senha
  const verificarSenha = (password) => {
    const criterios = {
      comprimento: password.length >= 8,
    };

    return criterios;
  };

  // Função para calcular caracteres restantes
  const calcularCaracteresRestantes = (password) => {
    return 8 - password.length;
  };

  // Manipulador de mudança de input
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const resultado = verificarSenha(newPassword);
    setCharsRemaining(calcularCaracteresRestantes(newPassword));
    console.log(resultado); // Aqui você pode substituir por uma lógica para exibir os resultados na UI
    console.log(password); // Aqui você pode substituir por uma lógica para exibir os resultados na UI
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validar campos
    if (!name || !email || !password) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    if (!isEmailValid) {
      setError("Email inválido.");
      return;
    }

    try {
      const response = await registerUser({
        nome: name,
        email,
        senha: password,
      });
      console.log("User registered:", response.data);
      setSuccess("Usuário registrado com sucesso!");
      setError("");
      showPopup();
      // Redirecionar ou limpar campos...
    } catch (error) {
      console.error("Error registering user:", error);
      setError("Erro ao registrar o usuário.");
      setSuccess("");
    }
  };

  return (
    <div className="register-container">
      <Info />
      <div className="register-right">
        <Container textAlign="center">
          <h2>Criar Conta</h2>
          <div className="form-container">
            <Form>
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
              <Button className="register-button" onClick={handleRegister}>
                Cadastrar-se
              </Button>
            </Form>
          </div>
          <Divider />
          <div className="footer">
            <p>Ou já tem uma conta?</p>
            <Link className="footer-link" to="/login">
              Login
            </Link>
          </div>
          {error && <Message negative>{error}</Message>}
          {success && <Message positive>{success}</Message>}
          {isPopupVisible && <Message positive>Redirecionando...</Message>}
        </Container>
      </div>
    </div>
  );
};

export default FormUsuarioRegister;
