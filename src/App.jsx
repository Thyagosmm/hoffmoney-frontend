import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/home/Home';
import FormUsuarioRegister from './views/usuario/FormUsuarioRegister';
import FormLogin from './views/login/FormLogin';
import FormDespesa from './views/despesa/FormDespesa';
import FormForget from './views/forget/FormForget';
import FormReset from './views/reset/FormReset';
import FormReceita from './views/receita/FormReceita';

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
