import { toast } from "react-toastify";

export const notify = (mensagem) => toast(mensagem, { position: "top-center" });

export const notifyInfo = (mensagem) => toast.info(mensagem, { position: "top-center" });

export const notifyWarn = (mensagem) => toast.warn(mensagem, { position: "top-center" });

export const notifySuccess = (mensagem) => toast.success(mensagem, { position: "top-center" });

export const notifyError = (mensagem) => toast.error(mensagem, { position: "top-center" });
