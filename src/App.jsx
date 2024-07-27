import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormUsuarioRegister from './views/usuario/FormUsuarioRegister';
import FormLogin from './views/login/FormLogin';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<FormUsuarioRegister />} />
                <Route path="/login" element={<FormLogin />} />
                {/* Adicione outras rotas aqui */}
            </Routes>
        </Router>
    );
}

export default App;
