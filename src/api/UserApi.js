import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8085/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Funções de USUÁRIO

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
export const updateUser = (userId, userData) => {
  return api.put(`/usuario/${userId}`, userData);
};

export const getUser = (userId) => {
  return api.get(`/usuario/${userId}`);
};

// Funções de SALDO

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

// Funções de DESPESA

export const registrarDespesa = (despesa) => {
  return api.post("/despesas", despesa);
};

export const listarDespesas = () => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    throw new Error("Usuário não está logado.");
  }
  return api.get(`/despesas/${userId}`).then((response) => {
    console.log(response.data);
    return response;
  });
};

export const buscarDespesaPorId = (usuarioId, despesaId) => {
  return api.get(`/despesas/${usuarioId}/${despesaId}`);
};

export const atualizarDespesa = (usuarioId, despesaId, despesaData) => {
  return api.put(`/despesas/${usuarioId}/${despesaId}`, despesaData);
};

export const deletarDespesa = (usuarioId, despesaId) => {
  return api.delete(`/despesas/${usuarioId}/${despesaId}`);
};

export const despesaPaga = (despesaId, novaPaga) => {
  return api.put(`/despesas/${despesaId}/paga`, novaPaga, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const receitaPaga = (receitaId, novaPaga) => {
  return api.put(`/receitas/${receitaId}/paga`, novaPaga, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
// Funções de RECEITA

export const registrarReceita = (receita) => {
  return api.post("/receitas", receita);
};

export const listarReceitas = () => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    throw new Error("Usuário não está logado.");
  }
  return api.get(`/receitas/${userId}`).then((response) => {
    console.log(response.data);
    return response;
  });
};

export const buscarReceitaPorId = (usuarioId, receitaId) => {
  return api.get(`/receitas/${usuarioId}/${receitaId}`);
};

export const atualizarReceita = (usuarioId, receitaId, receitaData) => {
  return api.put(`/receitas/${usuarioId}/${receitaId}`, receitaData);
};

export const deletarReceita = (usuarioId, receitaId) => {
  return api.delete(`/receitas/${usuarioId}/${receitaId}`);
};

// Funções de CATEGORIA DE DESPESA

export const listarCategoriasDespesa = () => {
  return api.get("/categoriadespesa");
};

export const buscarCategoriaDespesaPorId = (categoriaId) => {
  return api.get(`/categoriadespesa/${categoriaId}`);
};

export const atualizarCategoriaDespesa = (categoriaId, categoriaData) => {
  return api.put(`/categoriadespesa/${categoriaId}`, categoriaData);
};

export const registrarCategoriaDespesa = (categoriaData) => {
  return api.post("/categoriadespesa", categoriaData);
};

export const deletarCategoriaDespesa = (categoriaId) => {
  return api.delete(`/categoriadespesa/${categoriaId}`);
};

// Funções de CATEGORIA DE RECEITA

export const listarCategoriasReceita = () => {
  return api.get("/categoriareceita");
};

export const buscarCategoriaReceitaPorId = (categoriaId) => {
  return api.get(`/categoriareceita/${categoriaId}`);
};

export const atualizarCategoriaReceita = (categoriaId, categoriaData) => {
  return api.put(`/categoriareceita/${categoriaId}`, categoriaData);
};

export const registrarCategoriaReceita = (categoriaData) => {
  return api.post("/categoriareceita", categoriaData);
};

export const deletarCategoriaReceita = (categoriaId) => {
  return api.delete(`/categoriareceita/${categoriaId}`);
};
export const atualizarLimiteGastos = (id, novoLimite) => {
  return api.put(`/usuario/${id}/limite`, novoLimite);
};

export const consultarLimiteGastos = (id) => {
  return api.get(`/usuario/${id}/limite`);
};