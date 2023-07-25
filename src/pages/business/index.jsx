import React, { useEffect } from "react";
import { useState } from "react";
import Input from "../../components/input";
import { supabase } from "../../services/supabase";

const Business = () => {
  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [formError, setFormError] = useState("");

  const [business, setBusiness] = useState("");
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    const fetchBusiness = async () => {
      let { data, error } = await supabase.from("business").select("*");

      if (error) {
        setFetchError("Não foi possível buscar buscar");
        setBusiness(null);
        console.log(error);
      }

      if (data) {
        setBusiness(data);
        setFetchError(null);
      }
    };

    fetchBusiness();
  }, []);

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
      setFormError(null);
      // navigate('/');
    }
  };

  const onDelete = (id) => {
    setBusiness((prevBusiness) => {
      return prevBusiness.filter((sm) => sm.id !== id);
    });
  };

  const handleDelete = async (id) => {
    const { data, error } = await supabase
      .from("business")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.log("Business:", error);
      setFormError("Error ao apagar");
    }

    if (data) {
      console.log("Business, Data:", data);
      // navigate('/')
      onDelete(id);
    }
  };

  return (
    <div>
      <form
        className="flex w-full flex-col gap-3"
        onSubmit={handleSubmit}
        action=""
      >
        <div className="flex flex-col  gap-1">
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            onChange={(e) => setName(e.target.value)}
            className="bg-white rounded-lg py-1 w-full px-3 text-zinc-700 border border-[#e5e7eb]"
            value={name}
            type="text"
          />
        </div>

        <div className="flex flex-col  gap-1">
          <label htmlFor="cnpj">Cnpj</label>
          <input
            id="cnpj"
            label="Cnpj"
            className="bg-white rounded-lg py-1 w-full px-3 text-zinc-700 border border-[#e5e7eb]"
            value={cnpj}
            type="text"
            onChange={(e) => setCnpj(e.target.value)}
          />
        </div>

        <button className="bg-emerald-500 px-3 py-2 rounded" type="submit">
          Criar
        </button>
        {formError && <p className="text-sm text-red-400">{formError}</p>}
      </form>
      <div className="container mx-auto mt-8 p-6">
        <h1 className="text-3xl font-semibold mb-4">Empresas</h1>
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nome da empresa
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Cnpj
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Editar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {business &&
                business.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.cnpj}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                        ></button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Business;
