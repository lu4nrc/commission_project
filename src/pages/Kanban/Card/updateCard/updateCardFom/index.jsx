import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from '../../../../../components/button';

function updateCardForm({ toggle, card, updateCardData }) {
  const [temperature, setTemperature] = useState(card.temperature);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!temperature) {
      setFormError('Preencha todos os campos corretamente.');
      return;
    }
    try {
      await updateCardData(
        {
          ...card,
          temperature,
        },
        'update'
      );
      toggle();
    } catch (error) {
      console.log(error);
    }
  };

  /*     const handleDelete = async (business) => {
      await updateBusinessData(business, 'delete');
      toggle();
    }; */

  return (
    <div className="">
      <div className="flex gap-3">
        <form className="flex w-full flex-col gap-3" onSubmit={handleSubmit} action="">
          <div className="flex flex-col gap-1">
            <label>Temperatura</label>
            <select
              value={temperature}
              className="bg-slate-50 rounded-lg py-1 w-full px-3 text-zinc-700 border border-[#e5e7eb]"
              onChange={(e) => setTemperature(e.target.value)}
              name="temperature"
              id="temperature"
            >
              <option value="Frio">Frio</option>
              <option value="Frio">Morno</option>
              <option value="Frio">Quente</option>
            </select>
          </div>

          <div className="flex gap-2 justify-end">
            <Button label="Alterar" type="submit" />
          </div>
          {formError && <p className="text-sm text-red-400">{formError}</p>}
        </form>
      </div>
    </div>
  );
}

export default updateCardForm;
