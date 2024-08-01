import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormUsuarioRegister from './views/auth/usuario/FormUsuarioRegister';
import FormLogin from './views/auth/login/FormLogin';
import FormForget from './views/auth/forget/FormForget';
import FormReset from './views/auth/reset/FormReset';
import FormReceita from './views/receita/FormReceita';
import FormDespesa from './views/despesa/FormDespesa';
import Home from './views/home/Home';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<FormUsuarioRegister />} />
                <Route path="/login" element={<FormLogin />} />
                <Route path="/despesa" element={<FormDespesa />} />
                <Route path="/forget" element={<FormForget />} />
                <Route path="/reset" element={<FormReset />} />
                <Route path="/receita" element={<FormReceita />} />
                {/* Adicione outras rotas aqui */}
            </Routes>
        </Router>
    );
}

export default App;
