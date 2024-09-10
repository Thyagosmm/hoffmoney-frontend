import React, { useEffect, useState } from "react";
import { Button, Icon, Modal } from "semantic-ui-react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { listarDespesas, getUser, enviarPdfPorEmail } from "../../api/UserApi";
import { notifyError, notifySuccess } from "../utils/Utils";
import AppMenu from "../components/appMenu/AppMenu";

const PdfDespesas = () => {
  const [despesas, setDespesas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (userId) {
        const response = await getUser(userId);
        setUserEmail(response.data.email);
        setUserId(userId);
        fetchDespesas();
      } else {
        throw new Error("Usuário não está logado.");
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    }
  };

  const fetchDespesas = async () => {
    try {
      const { data } = await listarDespesas();
      setDespesas(data);
    } catch (error) {
      console.error("Erro ao listar despesas:", error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Relatório de Despesas", 14, 22);

    const tableColumn = [
      "Nome",
      "Categoria",
      "Valor (R$)",
      "Data de Cobrança",
      "Status",
    ];
    const tableRows = [];

    despesas.forEach((despesa) => {
      const despesaData = [
        despesa.nome,
        despesa.categoriaDespesa.descricaoCategoriaDespesa,
        despesa.valor.toFixed(2),
        despesa.dataDeCobranca,
        despesa.paga ? "Paga" : "Não Paga",
      ];
      tableRows.push(despesaData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    return doc;
  };

  const handleBaixarPdf = () => {
    const pdf = generatePDF();
    pdf.save("relatorio_despesas.pdf");
  };

  const handleEnviarEmail = async () => {
    const pdfBlob = generatePDF().output("blob");
    const pdfFile = new File([pdfBlob], "relatorio_despesas.pdf");

    try {
      await enviarPdfPorEmail(
        userEmail,
        "Relatório de Despesas",
        "Segue em anexo o relatório de despesas.",
        pdfFile,
      );
      notifySuccess("Relatório de despesas enviado com sucesso!");
    } catch (error) {
      notifyError("Erro ao enviar o relatório de despesas ao e-mail.");
      console.error(error);
    }

    setModalOpen(false);
  };

  const handleModalOption = (option) => {
    if (option === "sim") {
      handleEnviarEmail();
    } else {
      handleBaixarPdf();
      setModalOpen(false);
    }
  };

  return (
    <>
      <AppMenu />
      <div className="pdf-div">
        <div
          className="container-bordered"
          style={{
            width: "80vw",
            padding: "20px",
          }}
        >
          <h1>Relatório de Despesas</h1>
          <h4>
            Aqui você pode gerar o relatório das suas despesas e baixar ou
            enviá-lo para o seu e-mail.
          </h4>
          <Button
            className="form-button"
            onClick={() => setModalOpen(true)}
            icon
          >
            <Icon name="file pdf" size="big" />
            Gerar Relatório de Despesas
          </Button>
        </div>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          size="small"
        >
          <Modal.Header>Enviar Relatório por E-mail?</Modal.Header>
          <Modal.Content>
            <p>
              Você deseja enviar o relatório para o e-mail cadastrado (
              {userEmail})?
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" onClick={() => handleModalOption("nao")}>
              Não
            </Button>
            <Button color="green" onClick={() => handleModalOption("sim")}>
              Sim
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    </>
  );
};

export default PdfDespesas;
