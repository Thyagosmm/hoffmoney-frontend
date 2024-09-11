import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Divider, Form, Message } from "semantic-ui-react";
import "./FormReset.css";
import Info from "../../components/info/Info";
import { notifyError, notifySuccess } from "../../utils/Utils";
import { resetPasswordWithToken } from "../../../api/UserApi";

export default function FormReset() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get("token");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordValidation, setNewPasswordValidation] = useState({
    isValid: false,
    charsRemaining: 8,
  });
  const [confirmPasswordValidation, setConfirmPasswordValidation] = useState({
    isValid: false,
    charsRemaining: 8,
  });
  const validatePassword = (password) => {
    const minLength = 8;
    const charsRemaining = minLength - password.length;
    return {
      isValid: charsRemaining <= 0,
      charsRemaining,
    };
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

  const handleResetPassword = async () => {
    if (password.length < 8) {
      notifyError("A nova senha deve ter pelo menos 8 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      notifyError("As senhas não coincidem.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await resetPasswordWithToken(token, password);

      if (response.status === 200) {
        notifySuccess("Senha redefinida com sucesso.");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        notifyError("Houve um erro ao redefinir a senha.");
      }
    } catch (error) {
      notifyError("O token foi expirado ou não existe.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Info />
      <Container className="form-right" textAlign="center">
        <h2>Redefinir Senha</h2>
        <Form className="form-container">
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
                  Faltam {confirmPasswordValidation.charsRemaining} caracteres
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
          <Button
            className="form-button"
            onClick={handleResetPassword}
            loading={isLoading}
            disabled={isLoading}
          >
            Salvar
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
