import { toast } from "react-toastify";

export const notify = (mensagem) =>
  toast(mensagem, { position: "bottom-center" });

export const notifyInfo = (mensagem) =>
  toast.info(mensagem, { position: "bottom-center" });

export const notifyWarn = (mensagem) =>
  toast.warn(mensagem, { position: "bottom-center" });

export const notifySuccess = (mensagem) =>
  toast.success(mensagem, { position: "bottom-center" });

export const notifyError = (mensagem) =>
  toast.error(mensagem, { position: "bottom-center" });

export const mensagemErro = "Ocorreu algum erro inesperado.";
