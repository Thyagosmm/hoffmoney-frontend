import React, { useState } from 'react';
import AppMenu from '../appMenu/AppMenu';
import { Input } from 'semantic-ui-react';
import {
  incrementarSaldo,
  decrementarSaldo,
} from "../../../api/UserApi";

const EditarSaldo = () => {
    const [saldo, setSaldo] = useState(0);
  const [acao, setAcao] = useState('incrementar');


  const handleIncrementarSaldo = async (valor) => {
    const result = await incrementarSaldo(valor);
    alert(result.message);

    console.log(`Incrementar saldo em: ${valor}`);
  };

  const handleDecrementarSaldo = async (valor) => {
    const result = await decrementarSaldo(valor);
    alert(result.message);
    console.log(`Decrementar saldo em: ${valor}`);
  };    

  const handleSubmit = () => {
    if (acao === 'incrementar') {
      handleIncrementarSaldo(saldo);
    } else {
      handleDecrementarSaldo(saldo);
    }
  };

    return (
        <div>
            <AppMenu />
            <div>
                <Input
                    type="number"
                    value={saldo}
                    onChange={(e) => setSaldo(Number(parseFloat(e.target.value).toFixed(2)))}
                    placeholder="Valor do saldo"
                    step="0.01"
                />
                <div>
                    <label>
                        <input
                            type="radio"
                            value="incrementar"
                            checked={acao === 'incrementar'}
                            onChange={(e) => setAcao(e.target.value)}
                        />
                        Incrementar
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="decrementar"
                            checked={acao === 'decrementar'}
                            onChange={(e) => setAcao(e.target.value)}
                        />
                        Decrementar
                    </label>
                </div>
                <button onClick={handleSubmit}>Confirmar</button>
            </div>
        </div>
    );
};

export default EditarSaldo;