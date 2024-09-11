import jsPDF from "jspdf";
import "jspdf-autotable";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Icon, Modal } from "semantic-ui-react";
import {
  enviarPdfPorEmail,
  getUser,
  listarDespesas,
  listarReceitas,
} from "../../api/UserApi";
import { notifyError, notifySuccess } from "../utils/Utils";

const PdfCompleto = () => {
  const [despesas, setDespesas] = useState([]);
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
        fetchData();
      } else {
        throw new Error("Usuário não está logado.");
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    }
  };

  const fetchData = async () => {
    try {
      const despesasResponse = await listarDespesas();
      const receitasResponse = await listarReceitas();
      setDespesas(despesasResponse.data);
      setReceitas(receitasResponse.data);
    } catch (error) {
      console.error("Erro ao buscar dados financeiros:", error);
    }
  };

  const formatarMoeda = (valor) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const gerarPdf = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Relatório Completo", 14, 22);

    // Adicionar Tabela de Despesas com Cor Vermelha
    doc.setFontSize(16);
    doc.setTextColor(255, 0, 0); // Cor vermelha para despesas

    const despesasColumn = [
      "Nome",
      "Categoria",
      "Valor (R$)",
      "Data de Cobrança",
      "Status"
    ];

    const despesasRows = despesas.map(despesa => [
      despesa.nome,
      despesa.categoriaDespesa.descricaoCategoriaDespesa,
      despesa.valor.toFixed(2),
      despesa.dataDeCobranca
        ? new Date(despesa.dataDeCobranca + "T00:00:00").toLocaleDateString()
        : "Data não disponível",
      despesa.paga ? "Paga" : "Não Paga"
    ]);

    doc.autoTable({
      head: [despesasColumn],
      body: despesasRows,
      startY: 40,
      styles: {
        fillColor: [255, 230, 230], // Fundo claro para as despesas
      },
      headStyles: {
        fillColor: [255, 0, 0], // Cabeçalho de despesas em vermelho
      },
      margin: { top: 10 },
    });

    // Adicionar Tabela de Receitas com Cor Verde
    doc.setFontSize(16);
    doc.setTextColor(0, 128, 0); // Cor verde para receitas
 

    const receitasColumn = [
      "Nome",
      "Categoria",
      "Valor (R$)",
      "Data de Recebimento",
      "Status"
    ];

    const receitasRows = receitas.map(receita => [
      receita.nome,
      receita.categoriaReceita.descricaoCategoriaReceita,
      receita.valor.toFixed(2),
      receita.dataDeCobranca
        ? new Date(receita.dataDeCobranca + "T00:00:00").toLocaleDateString()
        : "Data não disponível",
      receita.paga ? "Recebida" : "Não Recebida"
    ]);

    doc.autoTable({
      head: [receitasColumn],
      body: receitasRows,
      startY: doc.lastAutoTable.finalY + 10,
      styles: {
        fillColor: [230, 255, 230], // Fundo claro para as receitas
      },
      headStyles: {
        fillColor: [0, 128, 0], // Cabeçalho de receitas em verde
      },
      margin: { top: 10 },
    });

    return doc;
  };


  const handleBaixarPdf = () => {
    const pdf = gerarPdf();
    pdf.save("relatorio-completo.pdf");
  };

  const handleEnviarEmail = async () => {
    const pdfBlob = gerarPdf().output("blob");
    const pdfFile = new File([pdfBlob], "relatorio-financeiro-completo.pdf");

    try {
      await enviarPdfPorEmail(userEmail, "Relatório Financeiro Completo", "Segue em anexo o relatório financeiro completo.", pdfFile);
      notifySuccess("Relatório completo enviado com sucesso!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      notifyError("Erro ao enviar o relatório completo ao e-mail.");
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
      <div className="pdf-div">
        <div
          className="container-bordered"
          style={{
            width: "80vw",
            padding: "20px",
          }}
        >
          <h1>Relatório Financeiro Completo</h1>
          <h4>
            Aqui você pode gerar o relatório completo das suas despesas e
            receitas e baixar ou enviá-lo para o seu e-mail.
          </h4>

          <Button
            className="form-button"
            onClick={() => setModalOpen(true)}
            icon
          >
            <Icon name="download" size="big" />
            Baixar Relatório Completo
          </Button>
        </div>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          size="small"
        >
          <Modal.Header>Enviar Relatório por E-mail?</Modal.Header>
          <Modal.Content>
            <h4>
              Você deseja enviar o relatório para o e-mail cadastrado (
              {userEmail})?
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
    </>
  );
};

export default PdfCompleto;
