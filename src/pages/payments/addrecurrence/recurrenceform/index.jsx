import React, { useState } from "react";
import Input from "../../../../components/input";
import { supabase } from "../../../../services/supabase";
import Select from "../../../../components/select";
import { useEffect } from "react";

const RecurrenceForm = ({toggle, onCreateSuccess}) => {
         //installments = Parcela
  const [installments, setInstallments] = useState(1);
  const [dueDate, setDueDate] = useState(null);
  const [paymentValue, setPaymentValue] = useState(null);


  const [selectedSalesman, setSelectedSalesman] = useState('');
  const [selectedBusiness, setselectedBusiness] = useState('');

  const [salesmans, setSalesmans] = useState([]);
  const [business, setBusiness] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: salesmanData, error: salesmanError } = await supabase
        .from("salesman")
        .select("*");

      if (salesmanError) {
        console.log("FetchError: ", salesmanError.message);
      } else {
        setSalesmans(salesmanData || []);
         setSelectedSalesman(salesmanData[0].id);
      }

      // Buscar  Empresas do Supabase
      const { data: businessData, error: businessError } = await supabase
        .from("business")
        .select(`id, name, fee_amount`);

      if (businessError) {
        console.log("FetchError: ", businessError.message);
      } else {
        setBusiness(businessData || []);
        setselectedBusiness(businessData[0].id)
      }
    };

    fetchData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const payments = [];
      console.log(payments);
      for (let i = 0; i < installments; i++) {
        // Calcula a data de pagamento de cada parcela
        const date = new Date(dueDate);
        date.setMonth(date.getMonth() + i);

        // Insere a parcela na lista
        payments.push({
          business_id: selectedBusiness,
          salesman_id: selectedSalesman, 
          payment_value: paymentValue,
          payment_status: false,
          due_date: date.toISOString(), //data de vencimento
          installment_number: i + 1 + "/" + installments,
        });
      }

      const { data, error } = await supabase.from("payments").insert(payments);
      console.log(payments)
      onCreateSuccess()
      toggle()
    } catch (error) {
      console.log(error);
    }
  }

console.log(selectedSalesman)

  return (
    <div>
        <h1 className=" text-3xl font-semibold mb-3">Pagamentos</h1>
      <form className="" onSubmit={handleSubmit}>
        <div className="flex gap-2 flex-col">
          <Select
            label="Selecionar Parceiro"
            name="salesman"
            items={salesmans}
            onChange={(e) => setSelectedSalesman(e.target.value)}
          />
          <Select
            label="Selecionar Empresa"
            name="business"
            items={business}
            onChange={(e) => setselectedBusiness(e.target.value)}
          />

          <Input
            id="installments"
            label="Quantidade de pagamentos"
            value={installments}
            onChange={(e) => setInstallments(e.target.value)}
            type="number"
          />

          <Input
            id="value"
            label="Valor de repasse"
            value={paymentValue}
            onChange={(e) => setPaymentValue(e.target.value)}
            type="number"
          />


          <Input
            id="duedate"
            label="Data de pagamento"
            onChange={(e) => setDueDate(e.target.value)}
            type="date"
          />
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  )
}

export default RecurrenceForm