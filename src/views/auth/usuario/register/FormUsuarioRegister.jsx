import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Form, Message } from "semantic-ui-react";
import { registerUser } from "../../../../api/UserApi";
import "./FormUsuarioRegister.css";
import Info from "../../../components/info/Info";
import { notifyError, notifySuccess, mensagemErro } from "../../../util/Util";

const FormUsuarioRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [charsRemaining, setCharsRemaining] = useState(8);
  const handleEmailChange = (e) => {
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

      notifySuccess('Usuario cadastrado com sucesso.')
      console.log("User registered:", response.data);
      // Redirecionar ou limpar campos...
      
      setTimeout(() => (window.location.href = "/login"), 3000);
    } catch (error) {
      if (error.response.data.errors != undefined) {
        for (let i = 0; i < error.response.data.errors.length; i++) {
          
          notifyError(error.response.data.errors[i].defaultMessage)
        }
      } else {
        notifyError(error.response.data.message)
      }
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
        </Container>
      </div>
    </div>
  );
};

export default FormUsuarioRegister;
