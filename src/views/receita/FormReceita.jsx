import React, { useState } from 'react';
import { Form, Dropdown } from 'semantic-ui-react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import './FormReceita.css';

const FormReceita = () => {
    const [nome, setNome] = useState('');
    const [valor, setValor] = useState(''); // Valor da despesa
    const [categoria, setCategoria] = useState('');
    const [recorrencia, setRecorrencia] = useState('');
    const [frequencia, setFrequencia] = useState('');
    const [descricao, setDescricao] = useState('');
    // const [data, setData] = useState(new Date());

    const opcoesCategoria = [
        { key: 'salario', text: 'Salário', value: 'salario' },
        { key: 'freelance', text: 'Freelance', value: 'freelance' },
        { key: 'dividendos', text: 'Dividendos', value: 'dividendos' },
        { key: 'juros', text: 'Juros', value: 'juros' },
        { key: 'aluguel', text: 'Aluguel de imóvel', value: 'aluguel' },
        { key: 'outra', text: 'Outra', value: 'outra' },
    ];

    const opcoesFrequencia = [
        { key: 'daily', text: 'Diariamente', value: 'daily' },
        { key: 'weekly', text: 'Semanalmente', value: 'weekly' },
        { key: 'monthly', text: 'Mensalmente', value: 'monthly' },
        { key: 'yearly', text: 'Anualmente', value: 'yearly' },
    ]

    // Função para lidar com a mudança no campo de recorrência
    const observandoRecorrencia = (e, { value }) => {
        setRecorrencia(value);
        // Se o valor selecionado for 'no', desmarque a frequência
        if (value === 'no') {
            setFrequencia('');
        }
    };

    // Função para lidar com a mudança no campo de frequência
    const mudandoFrequencia = (e, { value }) => {
        setFrequencia(value);
    };

    // Determina se o campo de frequência deve ser habilitado
    const frequenciaHabilitada = recorrencia === 'yes';

    const handleSave = () => {
        // Lógica para salvar a recetia
    };


    return (
        <div className="receita-container">
            <div className="receita-form">
                <h1>Cadastro de Receita</h1>
                <div className="form-content">
                    <div className="form-fields">
                        <Form>
                            <Form.Field>
                                <label>Nome</label>
                                <input
                                    placeholder='Digite o nome da Receita'
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Valor</label>
                                <input
                                    placeholder='Digite o valor da Receita'
                                    value={valor}
                                    onChange={(e) => setValor(e.target.value)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Categoria</label>
                                <Dropdown
                                    placeholder='Selecione a Categoria'
                                    fluid
                                    selection
                                    options={opcoesCategoria}
                                    value={categoria}
                                    onChange={(e, { value }) => setCategoria(value)}
                                />
                            </Form.Field>

                            <Form.Group>
                                <Form.Field width={8}>
                                    <label>Recorrente</label>
                                    <Dropdown
                                        placeholder='Selecione Recorrência'
                                        fluid
                                        selection
                                        options={[
                                            { key: 'yes', text: 'Sim', value: 'yes' },
                                            { key: 'no', text: 'Não', value: 'no' },
                                        ]}
                                        value={recorrencia}
                                        onChange={observandoRecorrencia}
                                    />
                                </Form.Field>
                                <Form.Field width={8}>
                                    <label>Frequência</label>
                                    <Dropdown
                                        placeholder='Selecione Frequência'
                                        fluid
                                        selection
                                        options={opcoesFrequencia}
                                        value={frequencia}
                                        onChange={mudandoFrequencia}
                                        disabled={!frequenciaHabilitada}
                                    />
                                </Form.Field>

                            </Form.Group>

                            <Form.Field>
                                <label>Descrição</label>
                                <input
                                    placeholder='Digite uma descrição para a receita'
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                />
                            </Form.Field>
                        </Form>
                    </div>
                    <div className="calendar-container">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar 
                            // onChange={setData}
                            // value={data}
                            />
                        </LocalizationProvider>
                    </div>
                </div>
                <div className="save-button-container">
                    <button className='botao'onClick={handleSave}>Salvar</button>
                </div>
            </div>
        </div>
    );
};

export default FormReceita;
