import React, { useState, useEffect } from "react";
import { Button, Container, Form, Message } from "semantic-ui-react";
import { updateUser, getUser } from "../../../../api/UserApi"; // Supondo que você tenha essas funções na sua API
import AppMenu from "../../../components/appMenu/AppMenu";

import "./FormUsuarioUpdate.css";



const FormUsuarioUpdate = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [charsRemaining, setCharsRemaining] = useState(8);

  useEffect(() => {
    // Supondo que você tenha uma função para obter os dados do usuário
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await getUser(userId);
        const { nome, email } = response.data;
        setName(nome);
        setEmail(email);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Erro ao carregar os dados do usuário.");
      }
    };

    fetchUserData();
  }, []);

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

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validar campos
    if (!name || !email) {
      setError("Nome e email são obrigatórios.");
      return;
    }

    if (!isEmailValid) {
      setError("Email inválido.");
      return;
    }

    try {
      const userId = localStorage.getItem("userId");
      const response = await updateUser(userId, {
        nome: name,
        email,
        senha: password,
      });
      console.log("User updated:", response.data);
      setSuccess("Usuário atualizado com sucesso!");
      setError("");
      showPopup();
      // Redirecionar ou limpar campos...
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Erro ao atualizar o usuário.");
      setSuccess("");
    }
  };
  return (
    <>
    <AppMenu />
  <Container textAlign="center">
          <h2>Editar Perfil</h2>
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
              <Button className="register-button" onClick={handleUpdate}>
                Atualizar
              </Button>
            </Form>
          </div>
          {error && <Message negative>{error}</Message>}
          {success && <Message positive>{success}</Message>}
          {isPopupVisible && <Message positive>Redirecionando...</Message>}
        </Container>
  </>
  );
};

export default FormUsuarioUpdate;