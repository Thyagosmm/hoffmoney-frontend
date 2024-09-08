import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Divider, Form, Message, Modal, } from "semantic-ui-react";
import "./FormForget.css";
import Info from "../../components/info/Info";
import { resetPassword } from "../../../api/UserApi";
import { notifyError } from "../../utils/Utils";

export default function FormEsqueciSenha() {
  const [email, setEmail] = React.useState("");
  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleForgotPassword = async () => {
    if (!isEmailValid) {
      notifyError("Por favor, insira um e-mail válido.");
    } else {
      setIsLoading(true);
      try {
        const response = await resetPassword(email);

        if (response.status === 200) {
          setModalOpen(true);
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

  const handleModalClose = () => {
    setModalOpen(false);
    navigate("/login");
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
                className="form-button"
                onClick={handleForgotPassword}
                loading={isLoading}
                disabled={isLoading}
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
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>HoffMoney</Modal.Header>
        <Modal.Content>
          <p>E-mail para redefinir senha foi enviado com sucesso.</p>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={handleModalClose}>
            OK
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
