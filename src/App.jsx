import React from "react";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormUsuarioRegister from "./views/auth/usuario/register/FormUsuarioRegister";
import FormLogin from "./views/auth/login/FormLogin";
import FormForget from "./views/auth/forget/FormForget";
import FormReset from "./views/auth/reset/FormReset";
import FormReceita from "./views/receita/FormReceita";
import ListaReceitas from "../src/views/receita/ListaReceitas";
import FormDespesa from "./views/despesa/FormDespesa";
import Home from "./views/home/Home";
import ListaDespesas from "./views/despesa/ListaDespesas";
import FormUsuarioUpdate from "./views/auth/usuario/update/FormUsuarioUpdate";
import EditarSaldo from "./views/components/saldo/EditarSaldo";
import EditarReceita from "./views/receita/EditarReceita";
import EditarDespesa from "./views/despesa/EditarDespesa";


function App() {
  return (
    <>
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<FormUsuarioRegister />} />
        <Route path="/update" element={<FormUsuarioUpdate />} />
        <Route path="/saldo" element={<EditarSaldo />} />
        <Route path="/login" element={<FormLogin />} />
        <Route path="/despesas" element={<ListaDespesas />} />
        <Route path="/novaDespesa" element={<FormDespesa />} />
        <Route path="/editarReceita/:id" element={<EditarReceita />} />
        <Route path="/editarDespesa/:id" element={<EditarDespesa />} />
        <Route path="/forget" element={<FormForget />} />
        <Route path="/reset" element={<FormReset />} />
        <Route path="/receitas" element={<ListaReceitas />} />
        <Route path="/novaReceita" element={<FormReceita />} />
      </Routes>
    </Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        font-size="1.5rem"
      />
    </>
  );
}

export default App;
