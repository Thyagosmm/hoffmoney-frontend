import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Form, Message } from "semantic-ui-react";
import "./FormForget.css";
import Info from "../../components/info/Info";

export default function FormEsqueciSenha() {
  const [email, setEmail] = React.useState("");
  const [isEmailValid, setIsEmailValid] = React.useState(false);
  function handleForgotPassword() {
    // Lógica para recuperação de senha
    console.log("Email:", email);
  }
const handleEmailChange = (e) => {
  const emailValue = e.target.value;
  setEmail(emailValue);
  // Chamar a função de validação
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
      <div className="forgot-password-right">
        <Container textAlign="center">
          <h2>Esqueceu a senha?</h2>
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
                  className="input-field"
                  type="email"
                  placeholder="Digite seu e-mail..."
                  value={email}
                  onChange={handleEmailChange}
                />
              </Form.Field>
              <Button
                className="forgot-password-button"
                onClick={handleForgotPassword}
              >
                Avançar
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
    </div>
  );
}
