// LimiteModal.js
import React, { useState } from 'react';
import { Modal, Input, Button, Header as SemanticHeader } from 'semantic-ui-react';

function LimiteModal({ open, onClose, onSave, limiteAtual }) {
  const [novoLimite, setNovoLimite] = useState(limiteAtual);

  const handleSave = () => {
    onSave(novoLimite);
    setNovoLimite(limiteAtual);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="small"
      closeIcon
    >
      <SemanticHeader icon="edit" content="Definir Limite de Gastos" />
      <Modal.Content>
        <Input
          fluid
          placeholder={`Limite atual: R$ ${limiteAtual}`}
          label={{ basic: true, content: "R$" }}
          labelPosition="left"
          type="number"
          value={novoLimite}
          onChange={(e) => setNovoLimite(parseFloat(e.target.value))}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={onClose}>
          Cancelar
        </Button>
        <Button color="green" onClick={handleSave}>
          Salvar
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default LimiteModal;
