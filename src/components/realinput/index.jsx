import React, { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';

function RealInput({ label, setPaymentValue, w, id }) {
  
  return (
    <div className={`flex flex-col gap-1 ${w}`}>
      <label className="dark:text-white" htmlFor={id}>
        {label}
      </label>
      <CurrencyInput
        prefix="R$"
        decimalSeparator=","
        groupSeparator="."
        className="bg-slate-50 w-full  dark:bg-slate-700 rounded-lg py-1 px-3 text-zinc-700 dark:text-white border border-[#e5e7eb] dark:border-slate-600"
        onValueChange={(value, name) => setPaymentValue(value)}
        placeholder="R$ 0,00"
        allowNegativeValue={false}
        intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
      />
    </div>
  );
}

export default RealInput;
