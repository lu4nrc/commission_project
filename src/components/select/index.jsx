import React from "react";

const Select = ({ items, onChange, name, label }) => {
  return (
    <div className="flex flex-col  gap-1">
      <label>{label}</label>
      <select
        className="bg-white rounded-lg py-1 w-full px-3 text-zinc-700 border border-[#e5e7eb]"
        onChange={onChange}
        name={name}
        id={name}
      >
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
