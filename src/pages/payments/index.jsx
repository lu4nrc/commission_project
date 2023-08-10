import React, { useEffect, useState } from 'react';
import ButtonGroup from '../../components/buttongroup';
import useModal from '../../hooks/useModal';
import { supabase } from '../../services/supabase';
import Loader from '../../utils/loader';
import AddPayments from './addpayment';
import TablePayments from './tablepayments';

function Payments() {
  const [loading, setLoading] = useState(true);
  const { isOpen, toggle } = useModal();

  const [data, setData] = useState([]);

  const initialDate = new Date();
  const firstDay = new Date(initialDate.getFullYear(), initialDate.getMonth(), 1);
  const firstDayDate = firstDay.toISOString();

  const FinalDate = new Date();
  const lastDay = new Date(FinalDate.getFullYear(), FinalDate.getMonth() + 1, 0);
  const lastDayDate = lastDay.toISOString();

  // console.log(firstDayDate, lastDayDate);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from('payments')
      .select(`*,business (name),salesman (name)`)
      .order('due_date', { ascending: true })
      .lte('due_date', lastDayDate)
      .gte('due_date', firstDayDate);

    if (error) {
      console.log('FetchError: ', error.message);
    } else {
      setData(data || []);
      setLoading(false);
    }
  };

  const reloadPayments = () => {
    fetchData();
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  return (
    <div>
      <Loader disabled={loading} />
      <AddPayments toggle={toggle} onCreateSuccess={reloadPayments} />
      <div className="flex gap-2">
        <ButtonGroup />
      </div>
      <div className="h-[calc(100vh-160px)] overflow-y-auto">
        <TablePayments data={data} startDate={data[0]} />
      </div>
    </div>
  );
}

export default Payments;
