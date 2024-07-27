import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Divider, Form, Icon, Message } from 'semantic-ui-react';
import logo from '../../assets/logo.png';
import { registerUser } from '../../api/UserApi';
import './FormUsuarioRegister.css';

const FormUsuarioRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        
        // Validar campos
        if (!name || !email || !password) {
            setError('Todos os campos são obrigatórios.');
            return;
        }

        try {
            const response = await registerUser({ nome: name, email, senha: password });
            console.log('User registered:', response.data);
            setSuccess('Usuário registrado com sucesso!');
            setError('');
            // Redirecionar ou limpar campos...
        } catch (error) {
            console.error('Error registering user:', error);
            setError('Erro ao registrar o usuário.');
            setSuccess('');
        }
    };

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
                                    value={name}
                                    onChange={e => setName(e.target.value)}
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
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Form.Field>
                            <Button className="register-button" onClick={handleRegister}>Cadastrar-se</Button>
                        </Form>
                    </div>
                    <Divider />
                    <div>
                        <p>Ou já tem uma conta? <Link className="login-link" to="/login">Login</Link></p>
                    </div>
                    {error && <Message negative>{error}</Message>}
                            {success && <Message positive>{success}</Message>}
                </Container>
            </div>
        </div>
    );
};

export default FormUsuarioRegister;
