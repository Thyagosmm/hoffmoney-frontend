import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormUsuarioRegister from "./views/auth/usuario/register/FormUsuarioRegister";
import FormLogin from "./views/auth/login/FormLogin";
import FormForget from "./views/auth/forget/FormForget";
import FormReset from "./views/auth/reset/FormReset";
import FormReceita from "./views/receita/FormReceita";
import ListaReceitas from "./views/components/listReceitas/ListaReceitas";
import FormDespesa from "./views/despesa/FormDespesa";
import Home from "./views/home/Home";
import ListaDespesas from "./views/components/listDespesas/ListaDespesas";
import FormUsuarioUpdate from "./views/auth/usuario/update/FormUsuarioUpdate";
import EditarSaldo from "./views/components/saldo/EditarSaldo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<FormUsuarioRegister />} />
        <Route path="/update" element={<FormUsuarioUpdate />} />
        <Route path="/saldo" element={<EditarSaldo />} />
        <Route path="/login" element={<FormLogin />} />
        <Route path="/despesas" element={<ListaDespesas />} />
        <Route path="/novaDespesa" element={<FormDespesa />} />
        <Route path="/forget" element={<FormForget />} />
        <Route path="/reset" element={<FormReset />} />
        <Route path="/receitas" element={<ListaReceitas />} />
        <Route path="/novaReceita" element={<FormReceita />} />
      </Routes>
    </Router>
  );
}

export default App;
