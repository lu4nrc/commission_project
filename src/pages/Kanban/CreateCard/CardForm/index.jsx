import React, { useEffect, useState } from 'react';
import Button from '../../../../components/button';
import Select from '../../../../components/select';
import { supabase } from '../../../../services/supabase';
export default function CardForm({ toggle, updateCardData }) {
  const [business, setBusiness] = useState([]);
  const [businessId, setBusinessId] = useState([]);
  const [formError, setFormError] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Buscar  Empresas do Supabase
      const { data: businessData, error: businessError } = await supabase
        .from('business')
        .select(`id, name, fee_amount`);

      if (businessError) {
        console.log('FetchError: ', businessError.message);
      } else {
        setBusiness(businessData || []);
        setBusinessId(businessData[0].id);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!businessId) {
      setFormError('Preencha todos os campos corretamente.');
      return;
    }
    try {
      await updateCardData({ businessId }, 'create');
      toggle();
    } catch (error) {
      console.log('Create Error:', error);
      setFormError('Preencha todos os campos corretamente.', error.message);
    }
  };

  return (
    <div>
      <h1 className=" text-3xl font-semibold mb-3">Adicionar card</h1>
      <form className="" onSubmit={handleSubmit}>
        <div className="flex gap-2 flex-col">
          <Select
            label="Selecionar Empresa"
            name="business"
            items={business}
            onChange={(e) => setBusinessId(e.target.value)}
          />
        </div>
        <Button type="submit" label="Criar Card" />
      </form>
    </div>
  );
}
