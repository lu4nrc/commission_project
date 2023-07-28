import { useEffect } from "react";
import { useState } from "react";
import { supabase } from "../../services/supabase";
import useModal from "../../hooks/useModal";
import CreateBusiness from "./createbusiness";
import UpdateBusiness from "./updatebusiness";
import Loader from "../../utils/loader";

const Business = () => {
  const { isOpen, toggle } = useModal();
  const [Loading, setLoading] = useState(false);

  const [business, setBusiness] = useState([]);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    fetchBusinessData();
  }, []);

  const fetchBusinessData = async () => {
    setLoading(true);
    let { data, error } = await supabase.from("business").select("*");

    if (error) {
      setFetchError("Não foi possível buscar buscar");
      setBusiness([]);
      console.log(error);
    } else {
      setBusiness(data || []);
      setFetchError("");
    }
    setLoading(false);
  };

  const reloadBusiness = () => {
    fetchBusinessData();
  };

  return (
    <div className="flex p-2 flex-col">
      <Loader disabled={Loading} />
      <CreateBusiness onCreateSuccess={reloadBusiness} />
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome da empresa
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cnpj
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Editar
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {business &&
              business.map((item) => {
                return (
                  <tr key={item.id}>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.cnpj}</td>
                    <td className="px-6 py-4">
                      <UpdateBusiness
                        id={item.id}
                        onUpdateSuccess={reloadBusiness}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Business;
