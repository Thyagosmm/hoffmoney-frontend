import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Divider, Form } from "semantic-ui-react";
import "./FormReset.css";
import Info from "../../components/info/Info";
import { notifyError, notifySuccess } from "../../utils/Utils";
import { resetPasswordWithToken } from "../../../api/UserApi";

export default function FormReset() {
  const [novaSenha, setNovaSenha] = React.useState("");
  const [confirmarNovaSenha, setConfirmarNovaSenha] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get("token");
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (novaSenha.length < 8) {
      notifyError("A nova senha deve ter pelo menos 8 caracteres.");
      return;
    }
    if (novaSenha !== confirmarNovaSenha) {
      notifyError("As senhas não coincidem.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await resetPasswordWithToken(token, novaSenha);

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
      <div className="reset-password-right">
        <Container textAlign="center">
          <h2 className="reset-password-title">Redefinir Senha</h2>
          <div className="form-container">
            <Form>
              <Form.Field className="form-field">
                <label>Nova Senha</label>
                <input
                  className="input-field"
                  type="password"
                  placeholder="Digite sua nova senha..."
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                />
              </Form.Field>
              <Form.Field className="form-field">
                <label>Confirme a Nova Senha</label>
                <input
                  className="input-field"
                  type="password"
                  placeholder="Confirme sua nova senha..."
                  value={confirmarNovaSenha}
                  onChange={(e) => setConfirmarNovaSenha(e.target.value)}
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
