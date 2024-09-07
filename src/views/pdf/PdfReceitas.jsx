import React, { useEffect, useState } from "react";
import { Button, Icon, Modal } from "semantic-ui-react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { listarReceitas, getUser, enviarPdfPorEmail } from "../../api/UserApi";
import { notifyError, notifySuccess } from "../utils/Utils";

const PdfReceitas = () => {
  const [receitas, setReceitas] = useState([]);
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
        fetchReceitas();
      } else {
        throw new Error("Usuário não está logado.");
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    }
  };

  const fetchReceitas = async () => {
    try {
      const { data } = await listarReceitas();
      setReceitas(data);
    } catch (error) {
      console.error("Erro ao listar receitas:", error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Relatório de Receitas", 14, 22);

    const tableColumn = ["Nome", "Categoria", "Valor (R$)", "Data de Cobrança", "Status"];
    const tableRows = [];

    receitas.forEach((receita) => {
      const receitaData = [
        receita.nome,
        receita.categoriaReceita.descricaoCategoriaReceita,
        receita.valor.toFixed(2),
        receita.dataDeCobranca,
        receita.paga ? "Recebida" : "Não Recebida"
      ];
      tableRows.push(receitaData);
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
    pdf.save("relatorio_receitas.pdf");
  };

  const handleEnviarEmail = async () => {
    const pdfBlob = generatePDF().output("blob");
    const pdfFile = new File([pdfBlob], "relatorio_receitas.pdf");

    try {
      await enviarPdfPorEmail(
        userEmail,
        "Relatório de Receitas",
        "Segue em anexo o relatório de receitas.",
        pdfFile
      );
      notifySuccess("Relatório de receitas enviado com sucesso!");
    } catch (error) {
      notifyError("Erro ao enviar o relatório de receitas ao e-mail.");
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
    <div style={{ padding: "20px" }}>
      <h1>Relatório de Receitas</h1>
      <p>
        Aqui você pode gerar o relatório das suas receitas e baixá-lo ou enviá-lo para o seu e-mail.
      </p>

      <Button color="blue" onClick={() => setModalOpen(true)} icon>
        <Icon name="file pdf" />
        Gerar Relatório de Receitas
      </Button>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} size="small">
        <Modal.Header>Enviar Relatório por E-mail?</Modal.Header>
        <Modal.Content>
          <p>Você deseja enviar o relatório para o e-mail cadastrado ({userEmail})?</p>
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
  );
};

export default PdfReceitas;
