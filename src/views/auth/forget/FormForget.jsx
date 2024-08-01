import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Form } from "semantic-ui-react";
import "./FormForget.css";
import Info from "../info/Info";

export default function FormEsqueciSenha() {
  const [email, setEmail] = React.useState("");

  function handleForgotPassword() {
    // Lógica para recuperação de senha
    console.log("Email:", email);
  }

  return (
    <div className="forgot-password-container">
      <Info />
      <div className="forgot-password-right">
        <Container textAlign="center">
          <h2>Esqueceu a senha?</h2>
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
          <div>
            <p>
              Ou não tem conta aqui?{" "}
              <Link className="register-link" to="/register">
                Criar conta
              </Link>
            </p>
          </div>
        </Container>
      </div>
    </div>
  );
}
