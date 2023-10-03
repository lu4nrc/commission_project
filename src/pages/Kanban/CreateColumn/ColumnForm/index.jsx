import React, { useState } from 'react';
import Input from '../../../../components/input';
import { v4 as uuidv4 } from 'uuid';
import Button from '../../../../components/button';

function ColumnForm({ toggle, updateColumnData, canva_id }) {
  const [name, setName] = useState('');
  const [formError, setFormError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      setFormError('Preencha todos os campos corretamente.');
      return;
    }
    try {
      await updateColumnData(
        { id: uuidv4(), canva_id: canva_id, name: name, isadd: false, items: [] },
        'create'
      );
      toggle();
    } catch (error) {
      console.log('Create Error:', error);
      setFormError('Preencha todos os campos corretamente.', error.message);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">Cadastro</h1>
      <form className="flex w-full flex-col gap-3" onSubmit={handleSubmit} >
        <Input
        w="w-full"
          label="Nome da coluna"
          id="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <div className="flex gap-2 justify-end">
          <Button className="bg-emerald-500 px-3 py-2 rounded" type="submit" label="Criar" />
        </div>
        {formError && <p className="text-sm text-red-400">{formError}</p>}
      </form>
    </div>
  );
}

export default ColumnForm;
