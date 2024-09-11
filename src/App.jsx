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
import FormCategoriaDespesa from "./views/categorias/FormCategoriaDespesa";
import EditarCategoriaDespesa from "./views/categorias/EditarCategoriaDespesa";
import FormCategoriaReceita from "./views/categorias/FormCategoriaReceita";
import EditarCategoriaReceita from "./views/categorias/EditarCategoriaReceita";
import PdfReceitas from "./views/pdf/PdfReceitas";
import PdfDespesas from "./views/pdf/PdfDespesas";
import PdfCompleto from "./views/pdf/PdfCompleto";
import Ativar from "./views/auth/usuario/ativar/Ativar";
import AppMenu from "./views/components/appMenu/AppMenu";
import ListaCategorias from "./views/categorias/ListaCategorias";

function App() {
  return (
    <>
      <Router>
        <AppMenu />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/pdfreceitas" element={<PdfReceitas />} />
          <Route path="/pdfdespesas" element={<PdfDespesas />} />
          <Route path="/pdfcompleto" element={<PdfCompleto />} />
          <Route
            path="/novacategoriareceita"
            element={<FormCategoriaReceita />}
          />
          <Route
            path="/editarcategoriareceita/:id"
            element={<EditarCategoriaReceita />}
          />
          <Route
            path="/novacategoriadespesa"
            element={<FormCategoriaDespesa />}
          />
          <Route
            path="/editarcategoriadespesa/:id"
            element={<EditarCategoriaDespesa />}
          />
          <Route path="/categorias" element={<ListaCategorias />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<FormUsuarioRegister />} />
          <Route path="/update" element={<FormUsuarioUpdate />} />
          <Route path="/ativar" element={<Ativar />} />
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
        autoClose={2500}
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