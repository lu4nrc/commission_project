const Input = ({ label, type = 'text', id ,value, onChange, refs}) => {
  return (
    <div className="flex flex-col  gap-1">
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      ref={refs}
      onChange={onChange}
      className="bg-white rounded-lg py-1 w-full px-3 text-zinc-700 border border-[#e5e7eb]"
      value={value}
      type={type}
    />
  </div>
  );
};

export default Input;
