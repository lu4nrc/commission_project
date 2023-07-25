import React, { useEffect } from "react";
import { useState } from "react";
import Input from "../../../../components/input";
import { supabase } from "../../../../services/supabase";

const BusinessForm = ({toggle, onCreateSuccess}) => {
  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !cnpj) {
      setFormError("Preencha todos os campos corretamente.");
      return;
    }

    const { data, error } = await supabase
      .from("business")
      .insert([{ name, cnpj }])
      .select();

    if (error) {
      console.log("Create Error:", error);
      setFormError("Preencha todos os campos corretamente.", error.message);
    }

    if (data) {
      console.log("Create, Data:", data);
      setName("");
      setCnpj("");
      setFormError("");
      onCreateSuccess()
      toggle()
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">Cadastro</h1>
      <form
        className="flex w-full flex-col gap-3"
        onSubmit={handleSubmit}
        action=""
      >

        <Input
        label='Nome'
        id='name'
        onChange={(e) => setName(e.target.value)}
        value={name}
        />

        <Input
        label='Cnpj'
        id='cnpj'
        onChange={(e) => setCnpj(e.target.value)}
        value={cnpj}
        />


        <div className="flex gap-2 justify-end">
          <button className="bg-emerald-500 px-3 py-2 rounded" type="submit">
            Criar
          </button>
        </div>
        {formError && <p className="text-sm text-red-400">{formError}</p>}
      </form>
    </div>
  );
};

export default BusinessForm;