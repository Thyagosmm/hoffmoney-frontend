import { useState, useEffect } from 'react';
import { atualizarLimiteGastos, consultarLimiteGastos } from '../../../api/UserApi';
import { notifyError, notifySuccess } from '../../utils/Utils';

function useLimite(userId) {
  const [limite, setLimite] = useState(0);

  useEffect(() => {
    const fetchLimite = async () => {
      try {
        const response = await consultarLimiteGastos(userId);
        setLimite(response.data);
      } catch (error) {
        console.error('Erro ao buscar limite de gastos', error);
      }
    };

    fetchLimite();
  }, [userId]);

  const atualizarLimite = async (novoLimite) => {
    try {
      await atualizarLimiteGastos(userId, novoLimite);
      notifySuccess('Limite de gastos atualizado com sucesso!');
      setLimite(novoLimite);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error('Erro ao atualizar o limite de gastos', error);
      notifyError('Erro ao atualizar o limite de gastos.');
    }
  };

  return { limite, atualizarLimite };
}

export default useLimite;