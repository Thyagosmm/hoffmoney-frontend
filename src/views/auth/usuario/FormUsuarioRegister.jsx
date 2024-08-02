import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Divider, Form,  Message } from 'semantic-ui-react';
import { registerUser } from '../../../api/UserApi';
import './FormUsuarioRegister.css';
import Info from '../../components/info/Info';

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
            <Info />
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
