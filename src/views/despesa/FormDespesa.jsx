import React, { useState } from 'react';
import { Form, Button, Dropdown } from 'semantic-ui-react';
import Calendar from 'react-calendar'; // Certifique-se de instalar e importar o componente de calendário
import './FormDespesa.css';

const FormDespesa = () => {
    const [name, setName] = useState('');
    const [value, setValue] = useState(''); // Valor da despesa
    const [category, setCategory] = useState('');
    const [recurrence, setRecurrence] = useState('');
    const [frequency, setFrequency] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());

    const categoryOptions = [
        { key: 'food', text: 'Alimentação', value: 'food' },
        { key: 'transport', text: 'Transporte', value: 'transport' },
        { key: 'rent', text: 'Aluguel', value: 'rent' },
        { key: 'utilities', text: 'Utilidades', value: 'utilities' },
        { key: 'entertainment', text: 'Entretenimento', value: 'entertainment' },
        { key: 'other', text: 'Outros', value: 'other' },
    ];

    const handleSave = () => {
        // Lógica para salvar a despesa
    };

    return (
        <div className="despesa-container">
            <div className="despesa-form">
                <h1>Cadastro de Despesa</h1>
                <div className="form-content">
                    <div className="form-fields">
                        <Form>
                            <Form.Field>
                                <label>Nome</label>
                                <input
                                    placeholder='Digite o nome da Despesa'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Valor</label>
                                <input
                                    placeholder='Digite o valor da Despesa'
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Categoria</label>
                                <Dropdown
                                    placeholder='Selecione a Categoria'
                                    fluid
                                    selection
                                    options={categoryOptions}
                                    value={category}
                                    onChange={(e, { value }) => setCategory(value)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Recorrente</label>
                                <Dropdown
                                    placeholder='Selecione Recorrência'
                                    fluid
                                    selection
                                    options={[
                                        { key: 'yes', text: 'Sim', value: 'yes' },
                                        { key: 'no', text: 'Não', value: 'no' },
                                    ]}
                                    value={recurrence}
                                    onChange={(e, { value }) => setRecurrence(value)}
                                />
                            </Form.Field>
                            {recurrence === 'yes' && (
                                <Form.Field>
                                    <label>Frequência</label>
                                    <Dropdown
                                        placeholder='Selecione Frequência'
                                        fluid
                                        selection
                                        options={[
                                            { key: 'daily', text: 'Diariamente', value: 'daily' },
                                            { key: 'weekly', text: 'Semanalmente', value: 'weekly' },
                                            { key: 'monthly', text: 'Mensalmente', value: 'monthly' },
                                            { key: 'yearly', text: 'Anualmente', value: 'yearly' },
                                        ]}
                                        value={frequency}
                                        onChange={(e, { value }) => setFrequency(value)}
                                    />
                                </Form.Field>
                            )}
                            <Form.Field>
                                <label>Descrição</label>
                                <input
                                    placeholder='Digite uma descrição para a despesa'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Form.Field>
                        </Form>
                    </div>
                    <div className="calendar-container">
                        <Calendar
                            onChange={setDate}
                            value={date}
                        />
                    </div>
                </div>
                <div className="save-button-container">
                    <Button className="save-button" onClick={handleSave}>Salvar</Button>
                </div>
            </div>
        </div>
    );
};

export default FormDespesa;
