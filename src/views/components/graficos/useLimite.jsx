import { useState, useEffect } from 'react';
import { atualizarLimiteGastos, consultarLimiteGastos } from '../../../api/UserApi';
import { notifyError, notifySuccess } from '../../utils/Utils';

function useLimite(userId) {
  const [limite, setLimite] = useState(0);
  const [primeiroAcesso, setPrimeiroAcesso] = useState(true);

  useEffect(() => {
    const fetchLimite = async () => {
      try {
        const response = await consultarLimiteGastos(userId);
        setLimite(response.data);
        setPrimeiroAcesso(false);
        localStorage.setItem("primeiroAcesso", "false");
      } catch (error) {
        console.error("Erro ao buscar limite de gastos", error);
      }
    };

    const primeiroAcessoLocal = localStorage.getItem("primeiroAcesso");
    if (primeiroAcessoLocal === "true" || primeiroAcessoLocal === null) {
      setPrimeiroAcesso(true);
    } else {
      fetchLimite();
    }
  }, [userId]);

  const atualizarLimite = async (novoLimite) => {
    try {
      await atualizarLimiteGastos(userId, novoLimite);
      notifySuccess("Limite de gastos atualizado com sucesso!");
      setLimite(novoLimite);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Erro ao atualizar o limite de gastos", error);
      notifyError("Erro ao atualizar o limite de gastos.");
    }
  };

  return { limite, atualizarLimite, primeiroAcesso, setPrimeiroAcesso };
}

export default useLimite;