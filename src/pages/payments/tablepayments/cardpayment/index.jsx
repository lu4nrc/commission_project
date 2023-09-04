import { DotsThreeVertical } from '@phosphor-icons/react';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import Toggle from '../../../../components/toggle';
import { supabase } from '../../../../services/supabase';

function CardPayment({ item }) {
  const [itemData, setItemData] = useState(item);

  async function handlePayment() {
    const paymentStatus = !itemData.payment_status;
    let paymentValue = itemData.payment_date;
    try {
      if (paymentStatus === true) {
        paymentValue = new Date();
      } else {
        paymentValue = null;
      }
      const update = { ...itemData, payment_status: paymentStatus, payment_date: paymentValue };
      setItemData(update);
      await supabase
        .from('payments')
        .update({ payment_status: paymentStatus, payment_date: paymentValue })
        .eq('id', item.id);
    } catch (error) {
      console.log(error);
    }
  }

  //ChatGPT
  function isDataMenorQueDataAtual(data) {
    const dataAtual = new Date();
    const dataValidar = new Date(data);
    return dataValidar < dataAtual;
  }

  if (itemData.data) {
    const dataDesejada = itemData.data;
    const resultado = isDataMenorQueDataAtual(dataDesejada);
    return (
      <tr>
        <td className="pl-3">
          <span className={`${resultado ? 'text-gray-400' : ''} text-xs`}>
            {dayjs(itemData.data).format('DD/MM/YYYY')}
          </span>
        </td>
      </tr>
    );
  }
  return (
    <tr key={item.id}>
      <td className=" pl-3 py-4 border-y-[1px] border-l-[1px] rounded-bl-xl rounded-tl-xl bg-white border-slate-300 ">
        <span className="font-semibold">{itemData.salesman.name}</span>
        <br />
        <span className="text-gray-400 text-sm">{itemData.business.name}</span>
      </td>
      <td className="border-y-[1px] bg-white border-slate-300 ">R$ {itemData.payment_value}</td>
      <td className="border-y-[1px] bg-white border-slate-300 ">
        <span className="font-semibold">{dayjs(itemData.due_date).format('DD/MM/YYYY')}</span>
        <br />
        <span className="text-gray-400">{itemData.installment_number}</span>
      </td>
      <td className="border-y-[1px] bg-white border-slate-300 ">
        {itemData.payment_date ? (
          <span className="font-semibold">{dayjs(itemData.payment_date).format('DD/MM/YYYY')}</span>
        ) : (
          <span>   -   </span>
        )}
      </td>
      <td className="border-y-[1px] bg-white border-slate-300 ">
        <div className="flex gap-2 items-center">
          <div
            className={`w-3 h-3 ${
              itemData.payment_status ? 'bg-green-600' : 'bg-yellow-600'
            } rounded-full `}
          />
          {itemData.payment_status ? <span>Pago</span> : <span>Pendente</span>}
        </div>
      </td>
      <td className="border-y-[1px] bg-white border-slate-300 border-r-[1px] rounded-br-xl rounded-tr-xl">
        <div className="flex">
          <Toggle isCheck={itemData.payment_status} onClick={handlePayment}/>
        </div>
      </td>
    </tr>
  );
}

export default CardPayment;
