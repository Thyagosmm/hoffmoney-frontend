import React from "react";
import { Link, Navigate } from "react-router-dom";
import { Button, Container, Divider, Form } from "semantic-ui-react";
import "./FormLogin.css";
import { login } from "../../../api/UserApi";
import Info from "../../components/info/Info";

export default function FormLogin() {
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [error, setError] = React.useState("");

  async function handleLogin() {
    const data = await login(email, senha);
    console.log("Dados recebidos da função login:", data);

    if (data && Object.keys(data).length > 0) {
      console.log("Usuário logado com sucesso:", data);
      localStorage.setItem("userId", data.id);
      localStorage.setItem("nome", data.nome);
      localStorage.setItem("email", data.email);

      console.log("Dados salvos no localStorage:");
      console.log("userId:", localStorage.getItem("userId"));
      console.log("nome:", localStorage.getItem("nome"));
      console.log("email:", localStorage.getItem("email"));
      window.location.href = "/";
    } else {
      setError("Dados recebidos são inválidos ou vazios:", data);
    }
  }

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
              </Form.Field>
              <Button className="login-button" onClick={handleLogin}>
                Entrar
              </Button>
              <div className="forgot-password">
                <Link to="/forget">Esqueci minha senha</Link>
              </div>
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
