import React, { useState } from 'react';
import Input from '../../../../components/input';
//import { supabase } from "../../../../services/supabase";
import Button from '../../../../components/button';

function BusinessForm({ toggle, updateBusinessData }) {
  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [feeAmount, setFeeAmount] = useState('');
  const [contact, setContact] = useState([]);
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [regime, setRegime] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !cnpj || !feeAmount) {
      setFormError('Preencha todos os campos corretamente.');
      return;
    }
    try {
      await updateBusinessData(
        { name, cnpj, fee_amount: feeAmount, contact, email, city, state, regime },
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
      <form className="flex w-full flex-col gap-3" onSubmit={handleSubmit} action="">
        <Input
          label="Razão Social"
          id="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <div className="flex gap-2">
          <Input
            label="Cnpj"
            id="cnpj"
            model="cnpj"
            onChange={(e) => setCnpj(e.target.value)}
            value={cnpj}
          />
          <Input
            label="Regime tributário"
            id="regime"
            onChange={(e) => setRegime(e.target.value)}
            value={regime}
          />
        </div>

        <Input
          label="Valor do honorário"
          id="fee_amount"
          onChange={(e) => setFeeAmount(e.target.value)}
          value={feeAmount}
        />
        <Input
          label="Contatos"
          id="contact"
          onChange={(e) => setContact(e.target.value)}
          value={contact}
        />
        <Input label="Email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
        <div className="flex gap-2">
          <Input label="Cidade" id="city" onChange={(e) => setCity(e.target.value)} value={city} />
          <Input
            label="Estado"
            id="state"
            onChange={(e) => setState(e.target.value)}
            value={state}
          />
        </div>

        <div className="flex gap-2 justify-end">
          <Button
            className="bg-emerald-500 px-3 py-2 rounded"
            type="submit"
            label="Criar empresa"
          />
        </div>
        {formError && <p className="text-sm text-red-400">{formError}</p>}
      </form>
    </div>
  );
}

export default BusinessForm;
