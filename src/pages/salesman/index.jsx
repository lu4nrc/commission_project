import { useEffect } from 'react';
import { useState } from 'react';
import { supabase } from '../../services/supabase';
import Loader from '../../utils/loader';
import UpdateSalesman from './updatesalesman';
import CreateSalesman from './createsalesman';

function Salesman() {
  const [Loading, setLoading] = useState(false);

  const [salesman, setSalesman] = useState('');
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    fetchSalesmanData();
  }, []);

  const fetchSalesmanData = async () => {
    setLoading(true);
    let { data, error } = await supabase.from('salesman').select('*');

    if (error) {
      setFetchError('Não foi possível buscar buscar');
      setSalesman([]);
      console.log(error);
    } else {
      setSalesman(data || []);
      setFetchError('');
    }
    setLoading(false);
  };

  const reloadSalesman = () => {
    fetchSalesmanData();
  };

  return (
    <div className="flex p-2 flex-col">
      <Loader disabled={Loading} />
      <CreateSalesman onCreateSuccess={reloadSalesman} />
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
            {salesman &&
              salesman.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 dark:text-slate-200">{item.name}</td>
                  <td className="px-6 py-4 dark:text-slate-200"><UpdateSalesman id={item.id} onUpdateSuccess={reloadSalesman} /></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Salesman;
