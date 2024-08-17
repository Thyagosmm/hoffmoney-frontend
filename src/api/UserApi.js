import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8085/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = (userData) => {
  return api.post("/usuario", userData);
};

export async function login(email, senha) {
  try {
    const response = await api.post("/usuario/login", {
      email: email,
      senha: senha,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const registrarDespesa = (despesaData) => {
  return api.post("/despesas", despesaData);
};

export const listarDespesas = () => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    throw new Error("Usuário não está logado.");
  }
  return api.get(`/despesas/usuario/${userId}`);
};

export const buscarDespesaPorId = (usuarioId, despesaId) => {
  return api.get(`/despesas/usuario/${usuarioId}/${despesaId}`);
};

export const atualizarDespesa = (usuarioId, despesaId, despesaData) => {
  return api.put(`/despesas/usuario/${usuarioId}/${despesaId}`, despesaData);
};

export const deletarDespesa = (usuarioId, despesaId) => {
  return api.delete(`/despesas/usuario/${usuarioId}/${despesaId}`);
};

export const incrementarSaldo = (valor) => {
  const userId = localStorage.getItem("userId");

  return api.put(`/usuario/incrementar`, { id: userId, valor });
};

export const decrementarSaldo = (valor) => {
  const userId = localStorage.getItem("userId");

  return api.put(`/usuario/decrementar`, { id: userId, valor });
};

export const consultarSaldo = (userId) => {
  return api.get(`/usuario/saldo`, {
    params: {
      id: userId,
    },
  });
};

export const updateUser = (userId, userData) => {
  return api.put(`/usuario/${userId}`, userData);
};

export const getUser = (userId) => {
  return api.get(`/usuario/${userId}`);
};

export const registrarReceita = (receitaData) => {
  return api.post("/receitas", receitaData);
};

export const listarReceitas = () => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    throw new Error("Usuário não está logado.");
  }
  return api.get(`/receitas/usuario/${userId}`);
};

export const buscarReceitaPorId = (usuarioId, receitaId) => {
  return api.get(`/receitas/usuario/${usuarioId}/${receitaId}`);
};

export const atualizarReceita = (usuarioId, receitaId, receitaData) => {
  return api.put(`/receitas/usuario/${usuarioId}/${receitaId}`, receitaData);
};

export const deletarReceita = (usuarioId, receitaId) => {
  return api.delete(`/receitas/usuario/${usuarioId}/${receitaId}`);
};
export const atualizarPaga = (usuarioId, despesaId, novaPaga) => {
  return api.put(`/despesas/usuario/${usuarioId}/${despesaId}/paga`, { paga: novaPaga });
};