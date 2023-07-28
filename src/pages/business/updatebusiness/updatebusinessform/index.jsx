import React, { useEffect } from "react";
import { useState } from "react";
import Input from "../../../../components/input";
import { supabase } from "../../../../services/supabase";

const UpdateBusinessForm = ({toggle, id, onUpdateSuccess}) => {
  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !cnpj ) {
      setFormError("Preencha todos os campos corretamente.");
      return;
    }

    const { data, error } = await supabase
      .from("business")
      .update({ name, cnpj  })
      .eq("id", id)
      .select();

    if (error) {
      console.log("Update",error);
      setFormError("Preencha todos os campos corretamente.");
    }

    if (data) {
      setFormError(null);
      onUpdateSuccess()
      toggle()
      console.log("Update OK");
    }
  };

  useEffect(() => {
    const fetchBusiness = async () => {
      const { data, error } = await supabase
        .from("business")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        console.log(error);
      }

      if (data) {
        setName(data.name);
        setCnpj(data.cnpj);
      }
    };

    fetchBusiness();
  }, [id]);


  const handleDelete = async (id) => {
    const { data, error } = await supabase
      .from("business")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.log("Business:", error);
    }

    if (data) {
      console.log("Business, Data:", data);
      onUpdateSuccess()
      toggle()
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">Atualizar Dados</h1>
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
        model='cnpj'
        onChange={(e) => setCnpj(e.target.value)}
        value={cnpj}
        />


        <div className="flex gap-2 justify-end">
          <button onClick={() => handleDelete(id)} className=" px-2 py-1  rounded text-red-600" type="button">
            Apagar
          </button>
          <button className="bg-emerald-500 px-3 py-2 rounded" type="submit">
            Alterar
          </button>
        </div>
        {formError && <p className="text-sm text-red-400">{formError}</p>}
      </form>
    </div>
  );
};

export default UpdateBusinessForm;
