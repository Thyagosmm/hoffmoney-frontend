import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import logo from '../../assets/logo.png';
import './FormReset.css';

export default function FormReset() {
    const [novaSenha, setNovaSenha] = React.useState('');
    const [confirmarNovaSenha, setConfirmarNovaSenha] = React.useState('');

    function handleResetPassword() {
        // Lógica para redefinir a senha
        console.log('Nova Senha:', novaSenha);
        console.log('Confirmar Nova Senha:', confirmarNovaSenha);
    }

    return (
        <div className="reset-password-container">
            <div className="reset-password-left">
                <img src={logo} alt="Marca" className="reset-password-logo" />
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
            <div className="reset-password-right">
                <Container textAlign='center'>
                    <h2 className="reset-password-title">Redefinir Senha</h2>
                    <div className="form-container">
                        <Form>
                            <Form.Field className="form-field">
                                <label>Nova Senha</label>
                                <input
                                    className="input-field"
                                    type="password"
                                    placeholder='Digite sua nova senha...'
                                    value={novaSenha}
                                    onChange={e => setNovaSenha(e.target.value)}
                                />
                            </Form.Field>
                            <Form.Field className="form-field">
                                <label>Confirme a Nova Senha</label>
                                <input
                                    className="input-field"
                                    type="password"
                                    placeholder='Confirme sua nova senha...'
                                    value={confirmarNovaSenha}
                                    onChange={e => setConfirmarNovaSenha(e.target.value)}
                                />
                            </Form.Field>
                            <Button className="reset-password-button" onClick={handleResetPassword}>Salvar</Button>
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
