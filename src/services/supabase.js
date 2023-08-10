import { createClient } from "@supabase/supabase-js";

const projectURL = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const projectKey = import.meta.env.VITE_PROJECT_ANON_KEY_SUPABASE;

export const supabase = createClient(projectURL, projectKey);

const dbaAddBusiness = async ( business ) => {
  try {
    await supabase
      .from("business")
      .insert([
        {
          name: business.name,
          cnpj: business.cnpj,
          fee_amount: business.feeAmount,
        },
      ])
      .select();
  } catch (error) {
    throw new Error("Novo error")
  }
};
const dbAddPayments = async ( payments) => {
  try {
    await supabase
      .from("payments")
      .insert(payments)
      .select();
  } catch (error) {
    throw new Error("Novo error")
  }
};

const dbUpdateBusiness = async (business) => {
  try {
    await supabase
    .from("business")
    .update({ name: business.name, cnpj: business.cnpj, fee_amount: business.fee_amount })
    .eq("id", business.id)
    .select();
  } catch (error) {
    console.log("Error Update",error)
  }
};

const dbDeleteBusiness = async ( business ) => {
  try {
    await supabase
      .from("business")
      .delete()
      .eq("id", business.id)
      .select();
  } catch (error) {
    console.log(error)
  }
};

export { dbaAddBusiness, dbDeleteBusiness, dbUpdateBusiness, dbAddPayments };
