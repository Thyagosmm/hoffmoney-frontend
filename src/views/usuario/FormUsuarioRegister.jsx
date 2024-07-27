import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import InputMask from 'react-input-mask';
import logo from '../../assets/logo.png';
import './FormUsuarioRegister.css';

export default function FormUsuarioRegister() {
    const [nome, setNome] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');

    function handleRegister() {
        // Lógica para cadastrar o usuário
        console.log('Nome:', nome);
        console.log('Email:', email);
        console.log('Senha:', senha);
    }

    return (
        <div className="register-container">
            <div className="register-left">
                <img src={logo} alt="Marca" className="register-logo" />
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
            <div className="register-right">
                <Container textAlign='center'>
                    <h2>Criar Conta</h2>
                    <div className="form-container">
                        <Form>
                            <Form.Field className="form-field">
                                <label>Nome</label>
                                <input
                                    className="input-field"
                                    placeholder='Nome'
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                />
                            </Form.Field>
                            <Form.Field className="form-field">
                                <label>Email</label>
                                <input
                                    className="input-field"
                                    type="email"
                                    placeholder='Email'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Form.Field>
                            <Form.Field className="form-field">
                                <label>Senha</label>
                                <input
                                    className="input-field"
                                    type="password"
                                    placeholder='Senha'
                                    value={senha}
                                    onChange={e => setSenha(e.target.value)}
                                />
                            </Form.Field>
                            <Button className="register-button" onClick={handleRegister}>Cadastrar-se</Button>
                        </Form>
                    </div>
                    <Divider />
                    <div>
                        <p>Ou já tem uma conta? <Link className="login-link" to="/login">Login</Link></p>
                    </div>
                </Container>
            </div>
        </div>
    );
}
