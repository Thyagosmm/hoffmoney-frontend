import React, { useState, useEffect } from 'react';
import { Form, Button, Dropdown } from 'semantic-ui-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './FormReceita.css';
import { buscarReceitaPorId, atualizarReceita } from '../../api/UserApi';
import Header from '../components/appMenu/AppMenu';
import { useParams, useNavigate } from 'react-router-dom';

const EditarReceita = () => {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState(new Date());
  const [recorrencia, setRecorrencia] = useState('');
  const [frequencia, setFrequencia] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const usuarioId = localStorage.getItem("userId");

  useEffect(() => {
    const carregarReceita = async () => {
      try {
        const response = await buscarReceitaPorId(usuarioId, id);
        const receitaData = response.data;
        setNome(receitaData.nome);
        setValor(receitaData.valor);
        setCategoria(receitaData.categoria);
        setDescricao(receitaData.descricao);
        setRecorrencia(receitaData.recorrente);
        setFrequencia(receitaData.periodo);
        const dataReceita = new Date(receitaData.dataDeCobranca);
        if (!isNaN(dataReceita.getTime())) {
          setData(dataReceita);
        } else {
          console.error('Data inválida:', receitaData.dataDeCobranca);
        }
      } catch (error) {
        console.error('Erro ao carregar a receita', error);
        setError('Erro ao carregar a receita.');
      }
    };

    carregarReceita();
  }, [id, usuarioId]);

  const recOptions = [
    { key: 'sim', text: 'Sim', value: true },
    { key: 'nao', text: 'Não', value: false }
  ];

  const freqOptions = [
    { key: 'diario', text: 'Diariamente', value: 'diario' },
    { key: 'semanal', text: 'Semanalmente', value: 'semanal' },
    { key: 'mensal', text: 'Mensalmente', value: 'mensal' },
    { key: 'anual', text: 'Anualmente', value: 'anual' }
  ];

  const categoryOptions = [
    { key: 'Alimentação', text: 'Alimentação', value: 'Alimentação' },
    { key: 'Transporte', text: 'Transporte', value: 'Transporte' },
    { key: 'Aluguel', text: 'Aluguel', value: 'Aluguel' },
    { key: 'Utilidades', text: 'Utilidades', value: 'Utilidades' },
    { key: 'Entretenimento', text: 'Entretenimento', value: 'Entretenimento' },
    { key: 'Outros', text: 'Outros', value: 'Outros' },
  ];

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = formatDate(data);
    try {
      await atualizarReceita(usuarioId, id, {
        nome,
        valor,
        categoria,
        descricao,
        recorrente: recorrencia,
        periodo: frequencia,
        dataDeCobranca: formattedDate,
      });
      setSuccess('Receita atualizada com sucesso!');
      navigate('/receitas');
    } catch (error) {
      console.error('Erro ao atualizar a receita', error);
      setError('Erro ao atualizar a receita.');
    }
  };

  return (
    <>
      <div className="container">
        <Header />
        <div className="receita">
          <div className="receita-form">
            <h1>Editar Receita</h1>
            <div className="form-content">
              <div className="form-fields">
                <Form onSubmit={handleSubmit}>
                  <Form.Field>
                    <label>Nome</label>
                    <input
                      className="input-field"
                      placeholder="Digite o nome da Receita"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      required
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Valor</label>
                    <input
                      className="input-field"
                      type="number"
                      placeholder="Digite o valor da Receita"
                      value={valor}
                      onChange={(e) => setValor(e.target.value)}
                      required
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Categoria</label>
                    <Dropdown
                      className="input-field"
                      placeholder="Selecione a Categoria"
                      fluid
                      selection
                      options={categoryOptions}
                      value={categoria}
                      onChange={(e, { value }) => setCategoria(value)}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Recorrência</label>
                    <Dropdown
                      className="input-field"
                      placeholder="Selecione Recorrência"
                      fluid
                      selection
                      options={recOptions}
                      value={recorrencia}
                      onChange={(e, { value }) => setRecorrencia(value)}
                    />
                  </Form.Field>
                  {recorrencia && (
                    <Form.Field>
                      <label>Frequência</label>
                      <Dropdown
                        className="input-field"
                        placeholder="Selecione Frequência"
                        fluid
                        selection
                        options={freqOptions}
                        value={frequencia}
                        onChange={(e, { value }) => setFrequencia(value)}
                      />
                    </Form.Field>
                  )}
                  <Form.Field>
                    <label>Descrição</label>
                    <input
                      className="input-field"
                      placeholder="Digite uma descrição para a receita"
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                    />
                  </Form.Field>
                  <Button type="submit" className="save-button">Salvar</Button>
                </Form>
              </div>
              <div className="calendar-container">
                <Calendar onChange={setData} value={data} />
              </div>
            </div>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
          </div>
        </div>
      </div>
    </>
  );
}

export default EditarReceita;
