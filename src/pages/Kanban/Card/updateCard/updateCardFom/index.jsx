import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from '../../../../../components/button';
import { supabase } from '../../../../../services/supabase';

function updateCardForm({ toggle, cardInfor, setCardInfor }) {
  const [temperature, setTemperature] = useState(cardInfor.temperature);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await supabase.from('business').update({ temperature }).eq('id', cardInfor.id);
      const update = { ...cardInfor, temperature };
      setCardInfor(update);
      toggle();
    } catch (error) {
      console.log('Error Update', error);
    }
  };

  return (
    <div className="">
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <strong>Nome: </strong>
          <p className="capitalize text-gray-500">{cardInfor.name}</p>
        </div>
        <div className="flex gap-2">
          <strong>Cnpj: </strong>
          <p className="capitalize text-gray-500">{cardInfor.cnpj}</p>
        </div>
        <form className="flex w-full flex-col gap-3" onSubmit={handleSubmit} action="">
          <div className="flex  gap-1">
            <label>Temperatura</label>
            <select
              value={temperature}
              className="bg-slate-50 rounded-lg py-1 w-full px-3 text-zinc-700 border border-[#e5e7eb]"
              onChange={(e) => setTemperature(e.target.value)}
              name="temperature"
              id="temperature"
            >
              <option value="FRIO">Frio</option>
              <option value="MORNO">Morno</option>
              <option value="QUENTE">Quente</option>
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
