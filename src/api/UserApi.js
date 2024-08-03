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

// Adicionar estas funções

export const buscarDespesaPorId = (despesaId) => {
  return api.get(`/despesas/${despesaId}`);
};

export const atualizarDespesa = (despesaId, despesaData) => {
  return api.put(`/despesas/${despesaId}`, despesaData);
};

export const deletarDespesa = (despesaId) => {
  return api.delete(`/despesas/${despesaId}`);
};
