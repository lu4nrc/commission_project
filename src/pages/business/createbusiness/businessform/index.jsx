import React, { useState } from 'react';
import Input from '../../../../components/input';
//import { supabase } from "../../../../services/supabase";
import Button from '../../../../components/button';

export const regimeItems = ['Simples Nacional', 'Lucro Real', 'Lucro Presumido'];

export const estados = [
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
  const [feeAmount, setFeeAmount] = useState(null);
  const [contact, setContact] = useState({ name: '', phone: '' });
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [invoicing, setInvoicing] = useState(null);
  const [collaborators, setCollaborators] = useState(null);
  const [category, setCategory] = useState('');
  const [state, setState] = useState('');
  const [regime, setRegime] = useState('Simples Nacional');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      setFormError('Preencha todos os campos corretamente.');
      return;
    }
    try {
      await updateBusinessData(
        {
          name,
          cnpj,
          fee_amount: feeAmount,
          contact,
          email,
          city,
          state,
          regime,
          category,
          invoicing,
          collaborators,
        },
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
      <form className="flex w-full flex-col gap-3" onSubmit={handleSubmit} action="">
        <Input
          w="w-full"
          label="Razão Social"
          id="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <Input
          w="w-full"
          label="Categoria"
          id="name"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />
        <div className="flex gap-1">
          <Input
            label="Cnpj"
            id="cnpj"
            model="cnpj"
            onChange={(e) => setCnpj(e.target.value)}
            value={cnpj}
          />
          <div className="flex flex-col w-1/2 gap-1">
            <label>Regime tributário</label>
            <select
              className="w-full bg-slate-50 rounded-lg py-1  px-3 text-zinc-700 border border-[#e5e7eb]"
              onChange={(e) => setRegime(e.target.value)}
              name={regime}
              id="regime"
            >
              {regimeItems.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <Input
            label="Qt. de Colaborador"
            id="collaborators"
            onChange={(e) => setCollaborators(e.target.value)}
          />
        </div>

        <div className="flex gap-1">
          <Input
            w="w-full"
            label="Cidade"
            id="city"
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
          <div className="flex flex-col gap-1 w-1/4">
            <label>Estados</label>
            <select
              className="w-full bg-slate-50 rounded-lg py-1 px-3 text-zinc-700 border border-[#e5e7eb]"
              onChange={(e) => setState(e.target.value)}
              name={state}
              id="state"
            >
              {estados.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-1">
          <Input
            label="Faturamento"
            id="invoicing"
            onChange={(e) => setInvoicing(e.target.value)}
          />
          <Input
            label="Valor do honorário"
            id="fee_amount"
            onChange={(e) => setFeeAmount(e.target.value)}
          />
        </div>
        <strong>Contato</strong>
        <div className="flex gap-1">
          <Input
            w="w-full"
            label="Nome"
            id="contact_name"
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
            value={contact.name}
          />
          <Input
            w="w-2/5"
            label="Telefone"
            id="phone"
            model="phone"
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            value={contact.phone}
          />
        </div>
        <Input
          w="w-full"
          label="Email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

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
