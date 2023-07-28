import React, { useEffect } from "react";
import { useState } from "react";
import { supabase } from "../../services/supabase";
import TablePayments from "./tablepayments";
import AddRecurrence from "./addrecurrence";
import Loader from "../../utils/loader";
import useModal from "../../hooks/useModal";
import Button from "../../components/button";
import ButtonGroup from "../../components/buttongroup";


const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [salesmans, setSalesmans] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, toggle } = useModal();


  const [data, setData] = useState([]);

  const [selectedsalesmansId, setSelectedSalesmansId] = useState([]);

  const initialDate = new Date();
  const firstDay = new Date(
    initialDate.getFullYear(),
    initialDate.getMonth(),
    1
  );
  const firstDayDate = firstDay.toISOString();

  const FinalDate = new Date();
  const lastDay = new Date(
    FinalDate.getFullYear(),
    FinalDate.getMonth() + 1,
    0
  );
  const lastDayDate = lastDay.toISOString();
  console.log(firstDayDate, lastDayDate);

  useEffect(() => {
    setLoading(true);
    fetchData()
  }, []);


  const fetchData = async () => {
    const { data, error } = await supabase
      .from("payments")
      .select(
        `*,
  business (
    name
  ),
  salesman (
    name
  )`
      )
      .order("due_date", { ascending: true })
      .lte("due_date", lastDayDate)
      .gte("due_date", firstDayDate);

    if (error) {
      console.log("FetchError: ", error.message);
    } else {
      setData(data || []);
      setLoading(false);
    }
  };

  const reloadPayments = () => {
    fetchData();
  };


  return (
    <div>
      <Loader disabled={loading} />
      <AddRecurrence toggle={toggle} onCreateSuccess={reloadPayments}/>
      <div className="flex gap-2">
        <ButtonGroup/>
      </div>
      <div className="h-[calc(100vh-160px)] overflow-y-auto">
        <TablePayments data={data} startDate={data[0]} />
      </div>
    </div>
  );
};

export default Payments;
