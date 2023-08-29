import InputMask from 'react-input-mask';

function Input({ label, type = 'text', id, value, onChange, refs, model, w= 'w-1/2' }) {

  if (model === 'cnpj') {
    return (
      <div className={`flex flex-col gap-1 ${w}`}>
        <label className="dark:text-white" htmlFor={id}>
          {label}
        </label>
        <InputMask
          id={id}
          mask="99.999.999/9999-99"
          ref={refs}
          onChange={onChange}
          className="w-full bg-slate-50 dark:bg-slate-700 rounded-lg py-1 px-3 text-zinc-700 dark:text-white border border-[#e5e7eb] dark:border-slate-600"
          value={value}
          type={type}
        />
      </div>
    );
  }
  if (model === 'phone') {
   return <div className={`flex flex-col gap-1 ${w}`}>
      <label className="dark:text-white" htmlFor={id}>
        {label}
      </label>
      <InputMask
        id={id}
        mask="(99) 9 9999-9999"
        ref={refs}
        onChange={onChange}
        className="bg-slate-50 w-full  dark:bg-slate-700 rounded-lg py-1 px-3 text-zinc-700 dark:text-white border border-[#e5e7eb] dark:border-slate-600"
        value={value}
        type={type}
      />
    </div>;
  }
  return (
    <div className={`flex flex-col gap-1 ${w}`}>
      <label className="dark:text-white" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        ref={refs}
        onChange={onChange}
        className="w-full bg-slate-50 dark:bg-slate-700 rounded-lg py-1 px-3 text-zinc-700 dark:text-white border border-[#e5e7eb] dark:border-slate-600"
        value={value}
        type={type}
      />
    </div>
  );
}

export default Input;
