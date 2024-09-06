import React, { useEffect, useState } from "react";
import { Button, Icon, Modal } from "semantic-ui-react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
    listarDespesas,
    listarReceitas,
    getUser,
    enviarPdfPorEmail,
} from "../../api/UserApi"; // Suas funções de API

const PdfCompleto = () => {
    const [despesas, setDespesas] = useState([]);
    const [receitas, setReceitas] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [userEmail, setUserEmail] = useState(""); // Email do usuário logado
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Buscar os dados do usuário logado e, em seguida, as despesas e receitas
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const userId = localStorage.getItem("userId");
            if (userId) {
                const response = await getUser(userId);
                setUserEmail(response.data.email);
                setUserId(userId); // Salvar o ID do usuário
                fetchData(); // Buscar despesas e receitas
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

        // Adicionar conteúdo ao PDF
        doc.text("Relatório Completo", 20, 20);
        // Exemplo de tabelas de despesas e receitas
        doc.autoTable({ html: "#despesasTable" });
        doc.autoTable({ html: "#receitasTable" });

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
            alert("Relatório enviado para o e-mail com sucesso!");
        } catch (error) {
            console.error("Erro ao enviar e-mail:", error);
            alert("Erro ao enviar o e-mail.");
        }

        setModalOpen(false);
    };

    const handleModalOption = (option) => {
        if (option === "sim") {
            handleEnviarEmail(); // Enviar o relatório por e-mail
        } else {
            handleBaixarPdf(); // Baixar o PDF
            setModalOpen(false);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Relatório Financeiro Completo</h1>
            <p>
                Aqui você pode gerar o relatório completo das suas despesas e receitas
                e baixar ou enviá-lo para o seu e-mail.
            </p>

            <Button color="green" onClick={() => setModalOpen(true)} icon>
                <Icon name="download" />
                Baixar Relatório Completo
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

            <table id="despesasTable" style={{ display: "none" }}>
                <thead>
                    <tr>
                        <th>Despesa</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {despesas.map((despesa, index) => (
                        <tr key={index}>
                            <td>{despesa.nome}</td>
                            <td>{formatarMoeda(despesa.valor)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <table id="receitasTable" style={{ display: "none" }}>
                <thead>
                    <tr>
                        <th>Receita</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {receitas.map((receita, index) => (
                        <tr key={index}>
                            <td>{receita.nome}</td>
                            <td>{formatarMoeda(receita.valor)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PdfCompleto;