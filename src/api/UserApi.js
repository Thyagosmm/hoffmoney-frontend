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

export const buscarDespesaPorId = (despesaId) => {
  return api.get(`/despesas/${despesaId}`);
};

export const atualizarDespesa = (despesaId, despesaData) => {
  return api.put(`/despesas/${despesaId}`, despesaData);
};

export const deletarDespesa = (despesaId) => {
  return api.delete(`/despesas/${despesaId}`);
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

export const buscarReceitaPorId = (receitaId) => {
  return api.get(`/receitas/${receitaId}`);
};

export const atualizarReceita = (receitaId, receitaData) => {
  return api.put(`/receitas/${receitaId}`, receitaData);
};

export const deletarReceita = (receitaId) => {
  return api.delete(`/receitas/${receitaId}`);
};
