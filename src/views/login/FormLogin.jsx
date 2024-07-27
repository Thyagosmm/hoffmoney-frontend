import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import logo from '../../assets/logo.png';
import './FormLogin.css';

export default function FormLogin() {
    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');

    function handleLogin() {
        // Lógica para autenticar o usuário
        console.log('Email:', email);
        console.log('Senha:', senha);
    }

    return (
        <div className="login-container">
            <div className="login-left">
                <img src={logo} alt="Marca" className="login-logo" />
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
            <div className="login-right">
                <Container textAlign='center'>
                    <h2>Faça login na sua conta</h2>
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
                            <Form.Field className="form-field">
                                <label>Senha</label>
                                <input
                                    className="input-field"
                                    type="password"
                                    placeholder='Digite sua senha...'
                                    value={senha}
                                    onChange={e => setSenha(e.target.value)}
                                />
                            </Form.Field>
                            <Button className="login-button" onClick={handleLogin}>Entrar</Button>
                            <div className="forgot-password">
                                <Link to="/esqueci-minha-senha">Esqueci minha senha</Link>
                            </div>
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
