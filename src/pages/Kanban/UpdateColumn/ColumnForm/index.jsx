import React, { useState } from 'react';
import Input from '../../../../components/input';

import Button from '../../../../components/button';

function ColumnForm({ toggle, updateColumnData, column }) {
  const [name, setName] = useState(column.name);
  const [formError, setFormError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      setFormError('Preencha todos os campos corretamente.');
      return;
    }
    try {
      await updateColumnData({ ...column, name: name }, 'update_name');
      toggle();
    } catch (error) {
      console.log('Create Error:', error);
      setFormError('Preencha todos os campos corretamente.', error.message);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">Atualizar Coluna</h1>
      <form className="flex w-full flex-col gap-3" onSubmit={handleSubmit}>
        <Input label="Novo nome" id="name" onChange={(e) => setName(e.target.value)} value={name} />

        <div className="flex gap-2 justify-end">
          <Button
            className="bg-emerald-500 px-3 py-2 rounded"
            type="submit"
            label="Atualizar coluna"
          />
        </div>
        {formError && <p className="text-sm text-red-400">{formError}</p>}
      </form>
    </div>
  );
}

export default ColumnForm;
