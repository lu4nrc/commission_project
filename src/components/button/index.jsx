import React from "react";
import { useState } from "react";
import { Children } from "react";

const Button = ({ onClick, label }) => {
  return (
    <div>

    <button
      className="py-2 px-4 rounded cursor-pointer transition bg-emerald-600 text-white"
      onClick={onClick}
      >
      {label}
    </button>
      </div>
  );
};

export default Button;
