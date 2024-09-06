import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable"; // opcional para criar tabelas mais facilmente
import { listarDespesas } from "../../api/UserApi";
import { Button, Icon } from "semantic-ui-react";

const PdfDespesas = () => {
  const [despesas, setDespesas] = useState([]);

  useEffect(() => {
    const fetchDespesas = async () => {
      try {
        const { data } = await listarDespesas();
        setDespesas(data);
      } catch (error) {
        console.error("Erro ao listar despesas:", error);
      }
    };
    fetchDespesas();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();

    // Título do documento
    doc.setFontSize(18);
    doc.text("Relatório de Despesas", 14, 22);

    // Cabeçalho da tabela
    const tableColumn = ["Nome", "Categoria", "Valor (R$)", "Data de Cobrança", "Status"];
    const tableRows = [];

    // Preencher linhas da tabela com as despesas
    despesas.forEach((despesa) => {
      const despesaData = [
        despesa.nome,
        despesa.categoriaDespesa.descricaoCategoriaDespesa,
        despesa.valor.toFixed(2),
        despesa.dataDeCobranca,
        despesa.paga ? "Paga" : "Não Paga"
      ];
      tableRows.push(despesaData);
    });

    // Gerar tabela com as despesas
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30, // Posição inicial no PDF
    });

    // Download do PDF
    doc.save("relatorio_despesas.pdf");
  };

  return (
    <div className="pdf-despesas-container">
      <Button color="blue" onClick={generatePDF} icon>
        <Icon name="file pdf" />
        Gerar PDF
      </Button>
    </div>
  );
};

export default PdfDespesas;
