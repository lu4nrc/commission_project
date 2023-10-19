import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Canva from './Canva';
import { supabase } from '../../services/supabase';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../../components/button';
import Input from '../../components/input';
import { useEffect } from 'react';
import Loader from '../../utils/loader';

function Kanban() {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [dataCanva, setDataCanva] = useState([]);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    setLoading(true)
    /* Buscar por todos os itens no db CANVA */
    const fetchData = async () => {
      const { data: salesmanData, error: salesmanError } = await supabase.from('canva').select('*');

      if (salesmanError) {
        console.log('FetchError: ', salesmanError.message);
      } else {
        setDataCanva(salesmanData || []);
      }
    };

    setLoading(false)
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = uuidv4();

    if (!name) {
      setFormError('Preencha todos os campos corretamente.');
      return;
    }

    const { data, error } = await supabase.from('canva').insert([{ id, name }]).select();

    if (error) {
      console.log('Create Error:', error);
      setFormError('Preencha todos os campos corretamente.', error.message);
    }

    if (data) {
      console.log('Create, Data:', data);
      setName('');
      setFormError('');
    }

    await supabase.from('columns').insert([
      {
        id: uuidv4(),
        canva_id: id,
        name: 'Primeira coluna',
        isadd: true,
        items: [],
      },
    ]);
  };

  return (
    <div className="flex p-2 gap-2 flex-col ">
      <Loader disabled={loading}/>
      <div className=' flex justify-between'>
      <h1 className="text-3xl font-semibold mb-4">Quadros</h1>
        <form className="flex  gap-3 items-center" onSubmit={handleSubmit} action="">
          <Input  id="name" onChange={(e) => setName(e.target.value)} value={name} />

          <div className="flex gap-2 justify-end">
            <Button label="Adicionar novo" type="submit" />
          </div>
          {formError && <p className="text-sm text-red-400">{formError}</p>}
        </form>
      </div>

      <div className="shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y dark:divide-gray-400">
          <thead className="bg-gray-50 dark:bg-slate-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium dark:text-white text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium dark:text-white text-gray-500 uppercase tracking-wider">
                Editar
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y dark:divide-gray-500 dark:bg-slate-800">
            {dataCanva &&
              dataCanva.map((el) => (
                <tr key={el.id}>
                  <td className="px-6 py-4 dark:text-slate-200">
                    <NavLink to={`canva/${el.id}`}>{el.name}</NavLink>
                  </td>
                  <td className="px-6 py-4 dark:text-slate-200">Editar</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Kanban;
