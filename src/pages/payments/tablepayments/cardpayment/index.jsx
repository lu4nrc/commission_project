import { DotsThreeVertical } from '@phosphor-icons/react';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import Toggle from '../../../../components/toggle';

function CardPayment({ item }) {
  const [paymentStatus, setPaymentStatus] = useState(item.payment_status);

  //ChatGPT
  function isDataMenorQueDataAtual(data) {
    const dataAtual = new Date();
    const dataValidar = new Date(data);
    return dataValidar < dataAtual;
  }

  if (item.data) {
    const dataDesejada = item.data;
    const resultado = isDataMenorQueDataAtual(dataDesejada);
    return (
      <tr>
        <td className="pl-3">
          <span className={`${resultado ? 'text-gray-400' : ''} text-xs`}>
            {dayjs(item.data).format('DD/MM/YYYY')}
          </span>
        </td>
      </tr>
    );
  }
  return (
    <tr key={item.id}>
      <td className=" pl-3 py-4 border-y-[1px] border-l-[1px] rounded-bl-xl rounded-tl-xl bg-white border-slate-300 ">
        <span className="font-semibold">{item.salesman.name}</span>
        <br />
        <span className="text-gray-400 text-sm">{item.business.name}</span>
      </td>
      <td className="border-y-[1px] bg-white border-slate-300 ">{item.payment_value}</td>
      <td className="border-y-[1px] bg-white border-slate-300 ">
        <span className="font-semibold">{dayjs(item.due_date).format('DD/MM/YYYY')}</span>
        <br />
        <span className="text-gray-400">{item.installment_number}</span>
      </td>
      <td className="border-y-[1px] bg-white border-slate-300 ">
        <div className="flex gap-2 items-center">
          <div
            className={`w-3 h-3 ${
              item.status_payment ? 'bg-green-600' : 'bg-yellow-600'
            } rounded-full `}
          />
          {item.status_payment ? <span>Pago</span> : <span>Pendente</span>}
        </div>
        {item.payment_status && <span className="font-normal text-xs">02/04/2024</span>}
      </td>
      <td className="border-y-[1px] bg-white border-slate-300 border-r-[1px] rounded-br-xl rounded-tr-xl">
        <div className="flex">
          <Toggle/>
          <DotsThreeVertical color="gray" size={32} />
        </div>
      </td>
    </tr>
  );
}

export default CardPayment;
