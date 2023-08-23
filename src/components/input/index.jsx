import InputMask from 'react-input-mask';

function Input({ label, type = 'text', id, value, onChange, refs, model }) {
  console.log(model);

  if (model === 'cnpj') {
    return (
      <div className="flex flex-col  gap-1">
        <label className="dark:text-white" htmlFor={id}>
          {label}
        </label>
        <InputMask
          id={id}
          mask="99.999.999/9999-99"
          ref={refs}
          onChange={onChange}
          className="bg-white dark:bg-slate-700 rounded-lg py-1 w-full px-3 text-zinc-700 dark:text-white border border-[#e5e7eb] dark:border-slate-600"
          value={value}
          type={type}
        />
      </div>
    );
  }
  if (model === 'phone') {
    <div className="flex flex-col  gap-1">
      <label className="dark:text-white" htmlFor={id}>
        {label}
      </label>
      <InputMask
        id={id}
        mask="(99)99999-9999"
        ref={refs}
        onChange={onChange}
        className="bg-white dark:bg-slate-700 rounded-lg py-1 w-full px-3 text-zinc-700 dark:text-white border border-[#e5e7eb] dark:border-slate-600"
        value={value}
        type={type}
      />
    </div>;
  }
  return (
    <div className="flex flex-col gap-1">
      <label className="dark:text-white" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        ref={refs}
        onChange={onChange}
        className="bg-white dark:bg-slate-700 rounded-lg py-1 px-3 text-zinc-700 dark:text-white border border-[#e5e7eb] dark:border-slate-600"
        value={value}
        type={type}
      />
    </div>
  );
}

export default Input;
