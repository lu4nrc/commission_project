import React, { useEffect } from "react";
import { useState } from "react";
import Input from "../../../../components/input";
import { supabase } from "../../../../services/supabase";
import Button from "../../../../components/button";

function SalesmanForm  ({ toggle, onCreateSuccess })  {
  const [name, setName] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      setFormError("Preencha todos os campos corretamente.");
      return;
    }

    const { data, error } = await supabase
      .from("salesman")
      .insert([{ name }])
      .select();

    if (error) {
      console.log("Create Error:", error);
      setFormError("Preencha todos os campos corretamente.", error.message);
    }

    if (data) {
      console.log("Create, Data:", data);
      setName("");
      setFormError("");
      onCreateSuccess();
      toggle();
    }
  };

  return (
    <div>
      <form
        className="flex w-full flex-col gap-3"
        onSubmit={handleSubmit}
        action=""
      >
        <Input
        w="w-full"
          label="Nome"
          id="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <div className="flex gap-2 justify-end">
          <Button label="Criar"  type="submit"
          />
        </div>
        {formError && <p className="text-sm text-red-400">{formError}</p>}
      </form>
    </div>
  );
};

export default SalesmanForm;
