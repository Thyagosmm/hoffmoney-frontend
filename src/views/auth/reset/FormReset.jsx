import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Divider, Form } from 'semantic-ui-react';
import './FormReset.css';
import Info from '../../components/info/Info';

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
            <Info/>
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
