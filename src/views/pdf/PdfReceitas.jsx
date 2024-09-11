import jsPDF from "jspdf";
import "jspdf-autotable";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Icon, Modal } from "semantic-ui-react";
import { enviarPdfPorEmail, getUser, listarReceitas } from "../../api/UserApi";
import { notifyError, notifySuccess } from "../utils/Utils";

const PdfReceitas = () => {
  const [receitas, setReceitas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

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

    const tableColumn = [
      "Nome",
      "Categoria",
      "Valor (R$)",
      "Data de Recebimento",
      "Status",
    ];
    const tableRows = [];

    receitas.forEach((receita) => {
      const dataDeCobranca = receita.dataDeCobranca ? new Date(receita.dataDeCobranca + "T00:00:00").toLocaleDateString() : "Data não disponível";
      const receitaData = [
        receita.nome,
        receita.categoriaReceita.descricaoCategoriaReceita,
        receita.valor.toFixed(2),
        dataDeCobranca,
        receita.paga ? "Recebida" : "Não Recebida",
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
        pdfFile,
      );
      notifySuccess("Relatório de receitas enviado com sucesso!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      notifyError("Erro ao enviar o relatório de receitas ao e-mail.");
      console.error(error);
    }

    setModalOpen(false);
  };

  const handleModalOption = (option) => {
    if (option === "sim") {
      handleEnviarEmail();
      setModalOpen(false);
      notifySuccess("Relatório de receitas enviado com sucesso!");
    } else {
      handleBaixarPdf();
      setModalOpen(false);
      notifySuccess("O relatório de receitas será baixado em breve!");
    }
  };

  return (
    <>
      <div className="pdf-div">
        <div
          className="container-bordered"
          style={{
            width: "80vw",
            padding: "20px",
          }}
        >
          <h1>Relatório de Receitas</h1>
          <h4>
            Aqui você pode gerar o relatório das suas receitas e baixá-lo ou
            enviá-lo para o seu e-mail.
          </h4>

          <Button
            className="form-button"
            onClick={() => setModalOpen(true)}
            icon
          >
            <Icon name="file pdf" size="big" />
            Gerar Relatório de Receitas
          </Button>

          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            size="small"
          >
            <Modal.Header>Enviar Relatório por E-mail?</Modal.Header>
            <Modal.Content>
              <h4>
                Você deseja enviar o relatório para o e-mail cadastrado (
                {userEmail}
                )?
              </h4>
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
      </div>
    </>
  );
};

export default PdfReceitas;
