import React from "react";
import { useState } from "react";
import { Children } from "react";

const Button = ({ onClick, label, type = 'button' }) => {
  return (
    <div>

    <button
    type={type}
      className="py-2 px-4 rounded cursor-pointer transition bg-[#b9925b] text-white"
      onClick={onClick}
      >
      {label}
    </button>
      </div>
  );
};

export default Button;
