import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from '../../../../../components/button';
import { supabase } from '../../../../../services/supabase';

function updateCardForm({ toggle, cardInfor, updateCards }) {
  const [temperature, setTemperature] = useState(cardInfor.temperature);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateCards({ ...cardInfor, temperature: temperature }, 'update');

      toggle();
    } catch (error) {
      console.log('Create Error:', error);
      setFormError('Preencha todos os campos corretamente.', error.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await updateCards(cardInfor, 'delete');

      toggle();
    } catch (error) {
      console.log('Create Error:', error);
      setFormError('Preencha todos os campos corretamente.', error.message);
    }
  };

  return (
    <div className="">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col px-3">
          <strong>Razão Social: </strong>
          <p className="capitalize text-gray-500">{cardInfor.name ? cardInfor.name : '-'}</p>
        </div>
        <div className="flex flex-col">
          <strong>Cnpj: </strong>
          <p className="capitalize text-gray-500">{cardInfor.cnpj ? cardInfor.cnpj : '-'}</p>
        </div>

        <div className="flex flex-col">
          <strong>Categoria: </strong>
          <p className="capitalize text-gray-500">
            {cardInfor.category ? cardInfor.category : '-'}
          </p>
        </div>
        <div className="flex flex-col">
          <strong>Faturamento: </strong>
          <p className="capitalize text-gray-500">
            {cardInfor.invoicing ? cardInfor.invoicing : '-'}
          </p>
        </div>
        <div className="flex flex-col">
          <strong>Qnt. de colocaboradores: </strong>
          <p className="capitalize text-gray-500">
            {cardInfor.collaborators ? cardInfor.collaborators : '-'}
          </p>
        </div>
        <div className="flex flex-col">
          <strong>Local: </strong>
          <p className="capitalize text-gray-500">
            {cardInfor.city ? cardInfor.city : '-'}-{cardInfor.state ? cardInfor.state : '-'}
          </p>
        </div>
        <div className="flex flex-col">
          <strong>Contato: </strong>
          <p className="capitalize text-gray-500">
            {cardInfor.contact.name} - Tel: {cardInfor.contact.phone}
            {console.log(cardInfor)}
          </p>
        </div>
        <form className="flex w-full flex-col gap-3" onSubmit={handleSubmit} action="">
          <div className="flex justify-between gap-1 items-center">
            <div className='flex gap-2'> 

            <strong>Temperatura: </strong>
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
              <option value="IMPLANTAÇÃO">Implantação</option>
            </select>
              </div>
            <div className="flex gap-2 justify-end">
              <Button label="Alterar" type="submit" />
              <button
                type="button"
                onClick={handleDelete}
                className="py-2 px-4 rounded cursor-pointer transition border border-red-200 text-red-500"
              >
                Apagar
              </button>
            </div>
          </div>

          {formError && <p className="text-sm text-red-400">{formError}</p>}
        </form>
      </div>
    </div>
  );
}

export default updateCardForm;
