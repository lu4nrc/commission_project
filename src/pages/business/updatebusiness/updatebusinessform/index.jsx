import React, { useEffect } from 'react';
import { useState } from 'react';
import Input from '../../../../components/input';
import Button from '../../../../components/button';
//import { supabase } from "../../../../services/supabase";

function UpdateBusinessForm({ toggle, business, updateBusinessData }) {
  const [name, setName] = useState(business.name);
  const [cnpj, setCnpj] = useState(business.cnpj);
  const [feeAmount, setFeeAmount] = useState(business.fee_amount);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !cnpj) {
      setFormError('Preencha todos os campos corretamente.');
      return;
    }
    try {
      await updateBusinessData(
        { ...business, name: name, cnpj: cnpj, fee_amount: feeAmount },
        'update'
      );
      toggle();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (business) => {
    await updateBusinessData(business, 'delete');
    toggle();
  };

  return (
    <div className="">
      <h1 className="text-3xl font-semibold mb-4">Atualizar Dados</h1>
      <div className="flex gap-3">
        <form className="flex w-1/2 flex-col gap-3" onSubmit={handleSubmit} action="">
          <Input label="Nome" id="name" onChange={(e) => setName(e.target.value)} value={name} />

          <Input
            label="Cnpj"
            id="cnpj"
            model="cnpj"
            onChange={(e) => setCnpj(e.target.value)}
            value={cnpj}
          />

          <Input
            label="Valor do honorário"
            id="fee_amount"
            onChange={(e) => setFeeAmount(e.target.value)}
            value={feeAmount}
          />

          <div className="flex gap-2 justify-end">
            <button
              onClick={() => handleDelete(business)}
              className=" px-2 py-1  rounded text-red-600"
              type="button"
              >
              Apagar
            </button>
              <Button label="Alterar" type='submit' />
          </div>
          {formError && <p className="text-sm text-red-400">{formError}</p>}
        </form>
        <div className="w-1/2">
          <span>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae eos alias,
            minima voluptate reiciendis quisquam sed veritatis suscipit id facilis, voluptates enim
            nisi, magnam qui officiis est laborum odio placeat perspiciatis. Perferendis, blanditiis
            iure.
          </span>
        </div>
      </div>
    </div>
  );
}

export default UpdateBusinessForm;
