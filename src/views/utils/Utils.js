import { toast } from "react-toastify";

export const notify = (mensagem) =>
  toast(mensagem, { className: "toast-font-large" });

export const notifyInfo = (mensagem) =>
  toast.info(mensagem, {
    className: "toast-font-large",
  });

export const notifyWarn = (mensagem) =>
  toast.warn(mensagem, {
    className: "toast-font-large",
  });

export const notifySuccess = (mensagem) =>
  toast.success(mensagem, {
    className: "toast-font-large",
  });

export const notifyError = (mensagem) =>
  toast.error(mensagem, {
    className: "toast-font-large",
  });
export const notifyLoading = (mensagem) =>
  toast.loading(mensagem, {
    className: "toast-font-large",
  });

export const mensagemErro = "Ocorreu algum erro inesperado.";
