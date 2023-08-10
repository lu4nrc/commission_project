import { useEffect } from "react";
import { useState } from "react";
import {
  dbaAddBusiness,
  dbDeleteBusiness,
  dbUpdateBusiness,
  supabase,
} from "../../services/supabase";
import useModal from "../../hooks/useModal";
import CreateBusiness from "./createbusiness";
import UpdateBusiness from "./updatebusiness";
import Loader from "../../utils/loader";

const Business = () => {
  const { isOpen, toggle } = useModal();
  const [Loading, setLoading] = useState(false);

  const [businessData, setBusinessData] = useState([]);
  const [fetchError, setFetchError] = useState("");

  const updateBusinessData = async (business, type) => {
    let newBusinessData;
    setLoading(true);
    switch (type) {
      case "create":
        try {
          await dbaAddBusiness(business);
          newBusinessData = [...businessData, business];
          setBusinessData(newBusinessData);
        } catch (error) {
          console.log(error);
        }
        break;
      case "update":
        try {
          await dbUpdateBusiness(business);
          newBusinessData = businessData.map((oldBusiness) =>
            oldBusiness.id === business.id ? business : oldBusiness
          );
          setBusinessData(newBusinessData);
        } catch (error) {
          business;
        }

        break;
      case "delete":
        try {
          await dbDeleteBusiness(business);
          newBusinessData = businessData.filter(
            (empresa) => empresa.id !== business.id
          );
          setBusinessData(newBusinessData);
          console.log("Remove OK");
        } catch (error) {
          console.log("error");
        }

        break;

      default:
        break;
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBusinessData();
  }, []);

  const fetchBusinessData = async () => {
    setLoading(true);
    let { data, error } = await supabase.from("business").select("*");

    if (error) {
      setFetchError("Não foi possível buscar");
      setBusinessData([]);
      console.log(error);
    } else {
      setBusinessData(data || []);
      setFetchError("");
    }
    setLoading(false);
  };

  return (
    <div className="flex p-2 flex-col">
      <Loader disabled={Loading} />
      <CreateBusiness
        setBusinessData={setBusinessData}
        businessData={businessData}
        updateBusinessData={updateBusinessData}
      />
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
            {businessData &&
              businessData.map((business) => {
                return (
                  <tr key={business.id}>
                    <td className="px-6 py-4">{business.name}</td>
                    <td className="px-6 py-4">{business.cnpj}</td>
                    <td className="px-6 py-4">
                      <UpdateBusiness
                        business={business}
                        updateBusinessData={updateBusinessData}
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
