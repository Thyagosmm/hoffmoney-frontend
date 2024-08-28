import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListaReceitas from "../src/views/receita/ListaReceitas";
import FormForget from "./views/auth/forget/FormForget";
import FormLogin from "./views/auth/login/FormLogin";
import FormReset from "./views/auth/reset/FormReset";
import FormUsuarioRegister from "./views/auth/usuario/register/FormUsuarioRegister";
import FormUsuarioUpdate from "./views/auth/usuario/update/FormUsuarioUpdate";
import EditarDespesa from "./views/despesa/EditarDespesa";
import FormDespesa from "./views/despesa/FormDespesa";
import ListaDespesas from "./views/despesa/ListaDespesas";
import Home from "./views/home/Home";
import EditarReceita from "./views/receita/EditarReceita";
import FormReceita from "./views/receita/FormReceita";
import FormCategoriaDespesa from "./views/categoriadespesa/FormCategoriaDespesa";
import EditarCategoriaDespesa from "./views/categoriadespesa/EditarCategoriaDespesa";
import ListaCategoriaDespesa from "./views/categoriadespesa/ListaCategoriaDespesa";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/novacategoriadespesa" element={<FormCategoriaDespesa />} />
          <Route path="/editarcategoriadespesa/:id" element={<EditarCategoriaDespesa />} />
          <Route path="/categoriadespesa" element={<ListaCategoriaDespesa />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<FormUsuarioRegister />} />
          <Route path="/update" element={<FormUsuarioUpdate />} />
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
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        font-size="1.5rem"
        Bounce={true}
      />
    </>
  );
}

export default App;