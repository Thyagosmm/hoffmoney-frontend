import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { ativarConta } from "../../../../api/UserApi";
import AppMenu from "../../../components/appMenu/AppMenu";

const Ativar = () => {
  const [activationStatus, setActivationStatus] = useState(null);
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const token = query.get("token");

  const handleActivateAccount = async () => {
    try {
      const response = await ativarConta(token);
      if (response.status === 200) {
        setActivationStatus("success");
        setTimeout(() => (window.location.href = "/login"), 4000);
        // Redireciona após 3 segundos
      }
    } catch (error) {
      setActivationStatus("error");
    }
  };

  return (
    <>
      <AppMenu />
      <div className="page-div">
        <div className="container-bordered text-center">
          {activationStatus === "success" ? (
            <>
              <h1>Conta Verificada com Sucesso!</h1>
              <p className="lead">
                Sua conta foi verificada com sucesso. Você será redirecionado
                para a página de login em breve.
              </p>
            </>
          ) : activationStatus === "error" ? (
            <>
              <h1>Falha na Verificação da Conta</h1>
              <p className="lead">
                Ocorreu um erro ao verificar sua conta. Por favor, tente
                novamente ou entre em contato com o suporte.
              </p>
            </>
          ) : (
            <>
              <h1>Verificar Conta</h1>
              <p className="lead">
                Clique no botão abaixo para verificar sua conta.
              </p>
              <button
                onClick={handleActivateAccount}
                className="btn btn-primary"
              >
                Verificar Conta
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Ativar;
