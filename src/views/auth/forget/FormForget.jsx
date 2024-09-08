import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Form,
  Message,
  Modal,
} from "semantic-ui-react";
import "./FormForget.css";
import Info from "../../components/info/Info";
import { resetPassword } from "../../../api/UserApi";
import { notifyError, notifySuccess } from "../../utils/Utils";

export default function FormEsqueciSenha() {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    if (!isEmailValid) {
      notifyError("Por favor, insira um e-mail válido.");
    } else {
      setIsLoading(true);
      try {
        const response = await resetPassword(email);

        if (response.status === 200) {
          notifySuccess(
            "E-mail enviado com sucesso. Verifique sua caixa de entrada.",
          );
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        } else {
          notifyError("Houve um erro ao enviar o e-mail.");
        }
      } catch (error) {
        notifyError("Não existe uma conta com este e-mail");
      } finally {
        setIsLoading(false);
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
        <h2>Esqueceu a senha?</h2>
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
              className="input-field"
              type="email"
              placeholder="Digite seu e-mail..."
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Field>
          <Button
            className="form-button"
            onClick={handleForgotPassword}
            loading={isLoading}
            disabled={isLoading}
          >
            Avançar
          </Button>
        </Form>
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
