import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Para adicionar tabelas ao PDF
import { listarReceitas } from "../../api/UserApi";
import { Button, Icon } from "semantic-ui-react";
import { notifyError } from "../utils/Utils";

const PdfReceitas = () => {
  const [receitas, setReceitas] = useState([]);
  const [error, setError] = useState(null);

  // Função para buscar as receitas
  useEffect(() => {
    const getReceitas = async () => {
      try {
        const { data } = await listarReceitas();
        setReceitas(data);
      } catch (error) {
        setError(error.message);
      }
    };
    getReceitas();
  }, []);

  // Função para exportar o PDF
  const exportPDF = () => {
    const doc = new jsPDF();

    // Adicionar título ao PDF
    doc.text("Listagem de Receitas", 14, 22);

    // Dados das receitas
    const receitasData = receitas.map((receita) => [
      receita.nome,
      receita.categoriaReceita.descricaoCategoriaReceita,
      `R$ ${receita.valor}`,
      receita.dataDeCobranca,
      receita.paga ? "Recebida" : "Não Recebida",
    ]);

    // Adicionar a tabela ao PDF
    doc.autoTable({
      head: [["Nome", "Categoria", "Valor", "Data", "Status"]],
      body: receitasData,
      startY: 30,
    });

    // Salvar o PDF
    doc.save("receitas.pdf");
  };

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div>
      <Button color="blue" onClick={exportPDF}>
        <Icon name="file pdf" />
        Exportar Receitas para PDF
      </Button>
    </div>
  );
};

export default PdfReceitas;
