import React, { useEffect, useState } from "react";
import { Button, Container, Form, Message, Radio } from "semantic-ui-react";
import { getUser, updateUser } from "../../../../api/UserApi"; // Supondo que você tenha essas funções na sua API
import AppMenu from "../../../components/appMenu/AppMenu";

import { notifyError, notifySuccess } from "../../../utils/Utils"; // Importe as funções de notificação
import "./FormUsuarioUpdate.css";

const FormUsuarioUpdate = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [verifyCurrentPassword, setVerifyCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [currentPasswordValidation, setCurrentPasswordValidation] = useState({
    isValid: false,
    charsRemaining: 8,
  });
  const [newPasswordValidation, setNewPasswordValidation] = useState({
    isValid: false,
    charsRemaining: 8,
  });
  const [confirmPasswordValidation, setConfirmPasswordValidation] = useState({
    isValid: false,
    charsRemaining: 8,
  });
  const [changePassword, setChangePassword] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await getUser(userId);
        const { nome, email, senha } = response.data;
        setName(nome);
        setEmail(email);
        setVerifyCurrentPassword(senha);
      } catch (error) {
        console.error("Error fetching user data:", error);
        notifyError("Erro ao carregar os dados do usuário.");
      }
    };

    fetchUserData();
  }, []);

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

  const validatePassword = (password) => {
    const minLength = 8;
    const charsRemaining = minLength - password.length;
    return {
      isValid: charsRemaining <= 0,
      charsRemaining,
    };
  };

  const handleCurrentPasswordChange = (e) => {
    const password = e.target.value;
    setCurrentPassword(password);
    setCurrentPasswordValidation(validatePassword(password));
  };

  const handleNewPasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
    setNewPasswordValidation(validatePassword(password));
  };

  const handleConfirmPasswordChange = (e) => {
    const password = e.target.value;
    setConfirmPassword(password);
    setConfirmPasswordValidation(validatePassword(password));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      notifyError("Nome e email são obrigatórios.");
      return;
    }

    if (!isEmailValid) {
      notifyError("Email inválido.");
      return;
    }

    try {
      const userId = localStorage.getItem("userId");
      const userData = {
        nome: name,
        email,
      };

      if (changePassword) {
        if (!currentPassword) {
          notifyError("Senha atual é obrigatória.");
          return;
        }
        if (currentPassword !== verifyCurrentPassword) {
          notifyError("A senha atual não coincide.");
          return;
        }
        if (password !== confirmPassword) {
          notifyError(
            "A nova senha e a confirmação da nova senha não coincidem.",
          );
          return;
        }
      }
      if (changePassword) {
        userData.senha = password;
      } else {
        userData.senha = verifyCurrentPassword;
      }

      const response = await updateUser(userId, userData);
      console.log("User updated:", response.data);
      notifySuccess("Usuário atualizado com sucesso!");
      setTimeout(() => (window.location.href = "/"), 1500);
    } catch (error) {
      console.error("Error updating user:", error);
      notifyError("Erro ao atualizar o usuário.");
    }
  };

  return (
    <>
      <Container className="form-right" textAlign="center">
        <h2>Editar Perfil</h2>
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
          <Form.Field className="custom-radio">
            <label>Alterar senha?</label>
            <Radio
              toggle
              label={changePassword ? "Sim" : "Não"}
              checked={changePassword}
              onChange={() => setChangePassword(!changePassword)}
            />
          </Form.Field>
          {changePassword && (
            <>
              <Form.Field className="form-field">
                <label className="label-input">
                  Senha Atual
                  {currentPasswordValidation.charsRemaining > 0 ? (
                    <Message className="inputError" negative>
                      Faltam {currentPasswordValidation.charsRemaining}{" "}
                      caracteres
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
                  placeholder="Senha Atual"
                  value={currentPassword}
                  onChange={handleCurrentPasswordChange}
                />
              </Form.Field>
              <Form.Field className="form-field">
                <label className="label-input">
                  Nova Senha
                  {newPasswordValidation.charsRemaining > 0 ? (
                    <Message className="inputError" negative>
                      Faltam {newPasswordValidation.charsRemaining} caracteres
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
                  placeholder="Nova Senha"
                  value={password}
                  onChange={handleNewPasswordChange}
                />
              </Form.Field>
              <Form.Field className="form-field">
                <label className="label-input">
                  Confirmar Nova Senha
                  {confirmPasswordValidation.charsRemaining > 0 ? (
                    <Message className="inputError" negative>
                      Faltam {confirmPasswordValidation.charsRemaining}{" "}
                      caracteres
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
                  placeholder="Confirmar Nova Senha"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </Form.Field>
            </>
          )}
          <Button className="form-button" onClick={handleUpdate}>
            Atualizar
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default FormUsuarioUpdate;