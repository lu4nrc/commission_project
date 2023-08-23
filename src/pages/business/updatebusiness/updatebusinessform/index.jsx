import React, { useEffect } from 'react';
import { useState } from 'react';
import Input from '../../../../components/input';
import Button from '../../../../components/button';
import { estados, regimeItems } from '../../createbusiness/businessform';

function UpdateBusinessForm({ toggle, business, updateBusinessData }) {
  const [name, setName] = useState(business.name);
  const [category, setCategory] = useState(business.category);
  const [cnpj, setCnpj] = useState(business.cnpj);
  const [regime, setRegime] = useState(business.regime);
  const [collaborators, setCollaborators] = useState(business.collaborators);
  const [city, setCity] = useState(business.city);
  const [state, setState] = useState(business.state);
  const [invoicing, setInvoicing] = useState(business.invoicing);
  const [feeAmount, setFeeAmount] = useState(business.fee_amount);
  const [contact, setContact] = useState(business.contact);
  const [email, setEmail] = useState(business.email);
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
          ...business,
          name,
          category,
          cnpj,
          fee_amount: feeAmount,
          contact: { name: contact.name, phone: contact.phone },
          email,
          city,
          state,
          regime,
          invoicing,
          collaborators,
        },
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
        <form className="flex flex-col gap-3" onSubmit={handleSubmit} action="">
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
              value={regime}
                className="w-full bg-white rounded-lg py-1  px-3 text-zinc-700 border border-[#e5e7eb]"
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
            value={collaborators || ''}
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
              value={state}
                className="w-full bg-white rounded-lg py-1 px-3 text-zinc-700 border border-[#e5e7eb]"
                onChange={(e) => setState(e.target.value)}
                name='state'
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
            value={invoicing || ''}
              label="Faturamento"
              id="invoicing"
              onChange={(e) => setInvoicing(e.target.value)}
            />
            <Input
              label="Valor do honorário"
              id="fee_amount"
              onChange={(e) => setFeeAmount(e.target.value)}
              value={feeAmount || ''}
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
            <button
              onClick={() => handleDelete(business)}
              className=" px-2 py-1  rounded text-red-600"
              type="button"
            >
              Apagar
            </button>
            <Button label="Alterar" type="submit" />
          </div>
          {formError && <p className="text-sm text-red-400">{formError}</p>}
        </form>
        {/*         <div className="w-1/2">
          <span>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae eos alias,
            minima voluptate reiciendis quisquam sed veritatis suscipit id facilis, voluptates enim
            nisi, magnam qui officiis est laborum odio placeat perspiciatis. Perferendis, blanditiis
            iure.
          </span>
        </div> */}
      </div>
    </div>
  );
}

export default UpdateBusinessForm;
