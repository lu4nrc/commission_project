import React, { useState } from 'react';
import Input from '../../../../components/input';
//import { supabase } from "../../../../services/supabase";
import Button from '../../../../components/button';
import Select from '../../../../components/select';

const estados = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MS',
  'MT',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
];
function BusinessForm({ toggle, updateBusinessData }) {
  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [feeAmount, setFeeAmount] = useState('');
  const [contact, setContact] = useState({ name: '', phone: '' });
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');
  const [state, setState] = useState('');
  const [regime, setRegime] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !cnpj) {
      setFormError('Preencha todos os campos corretamente.');
      return;
    }
    try {
      await updateBusinessData(
        { name, cnpj, fee_amount: feeAmount, contact, email, city, state, regime, category },
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
      <h1 className="text-3xl font-semibold mb-4 dark:text-white">Cadastro</h1>
      <form className="flex w-full flex-col gap-3" onSubmit={handleSubmit} action="">
        <div className="flex gap-2">
          <Input
            label="Razão Social"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <Input
            label="Categoria"
            id="name"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          />
        </div>

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
        <strong>Contato</strong>

        <div className="flex gap-2">
          <Input
            label="Nome"
            id="contact_name"
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
            value={contact.name}
          />
          <Input
            label="Telefone"
            id="phone"
            model="phone"
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            value={contact.phone}
          />
        </div>
        <Input label="Email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
        <div className="flex gap-2">
          <Input label="Cidade" id="city" onChange={(e) => setCity(e.target.value)} value={city} />
          <div className="flex flex-col  gap-1">
            <label>Estados</label>
            <select
              className="bg-white rounded-lg py-1 w-full px-3 text-zinc-700 border border-[#e5e7eb]"
              onChange={(e) => setState(e.target.value)}
              name={state}
              id="state"
            >
              {estados.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
{/*           <Select
            items={estados}
            label="Estado"
            id="state"
            onChange={(e) => setState(e.target.value)}
            value={state}
          /> */}
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
