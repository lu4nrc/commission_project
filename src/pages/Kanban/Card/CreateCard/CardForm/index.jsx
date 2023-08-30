import React, { useEffect, useState } from 'react';
import Button from '../../../../../components/button';
import { supabase } from '../../../../../services/supabase';
export default function CardForm({ toggle, updateCards }) {
  const [business, setBusiness] = useState([]);
  const [selectedBusiness, setselectedBusiness] = useState('0');
  const [formError, setFormError] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      // Buscar  Empresas do Supabase
      const { data, error: businessError } = await supabase
        .from('business')
        .select(`id, name, contact, city, state, category, temperature, is_card`);

      if (businessError) {
        console.log('FetchError: ', businessError.message);
      } else {
        data.sort((a, b) => a.name.localeCompare(b.name));

        setBusiness(data || []);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBusiness) {
      setFormError('Preencha todos os campos corretamente.');
      return;
    }
    try {
      await updateCards(business[selectedBusiness], 'create');
      toggle();
      setselectedBusiness('0');
    } catch (error) {
      console.log('Create Error:', error);
      setFormError('Preencha todos os campos corretamente.', error.message);
    }
  };

  return (
    <div>
      <h1 className=" text-3xl font-semibold mb-3">Adicionar card</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex gap-2 flex-col">
          <div className="flex flex-col  gap-1">
            <label>Selecionar empresa</label>
            <select
              className="bg-white rounded-lg py-1 w-full px-3 text-zinc-700 border border-[#e5e7eb]"
              onChange={(e) => setselectedBusiness(e.target.value)}
              name="business"
              id="business"
            >
              {business.map((item, index) => (
                <option key={item.id} value={index}>
                  {item.name} - {item.cnpj}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Button type="submit" label="Criar Card" />
      </form>
    </div>
  );
}
