import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import logo from '../../assets/logo.png';
import './FormForget.css';

export default function FormEsqueciSenha() {
    const [email, setEmail] = React.useState('');

    function handleForgotPassword() {
        // Lógica para recuperação de senha
        console.log('Email:', email);
    }

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-left">
                <img src={logo} alt="Marca" className="forgot-password-logo" />
                <h2>"Gerenciando seu futuro financeiro!"</h2>
                <div className="social-links">
                    <div className="social-link">
                        <Icon name="instagram" size="large" />
                        <div><Link to="https://www.instagram.com">siga-nos</Link></div>
                    </div>
                    <div className="social-link">
                        <Icon name="mail" size="large" />
                        <div><Link to="mailto:contato@marca.com">contate-nos</Link></div>
                    </div>
                    <div className="social-link">
                        <Icon name="info circle" size="large" />
                        <div><Link to="/sobre">sobre nós</Link></div>
                    </div>
                </div>
            </div>
            <div className="forgot-password-right">
                <Container textAlign='center'>
                    <h2>Esqueceu a senha?</h2>
                    <div className="form-container">
                        <Form>
                            <Form.Field className="form-field">
                                <label>Email</label>
                                <input
                                    className="input-field"
                                    type="email"
                                    placeholder='Digite seu e-mail...'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Form.Field>
                            <Button className="forgot-password-button" onClick={handleForgotPassword}>Avançar</Button>
                        </Form>
                    </div>
                    <Divider />
                    <div>
                        <p>Ou não tem conta aqui? <Link className="register-link" to="/register">Criar conta</Link></p>
                    </div>
                </Container>
            </div>
        </div>
    );
}
