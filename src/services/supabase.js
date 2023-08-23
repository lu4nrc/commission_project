import { createClient } from '@supabase/supabase-js';

const projectURL = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const projectKey = import.meta.env.VITE_PROJECT_ANON_KEY_SUPABASE;

export const supabase = createClient(projectURL, projectKey);

const dbaAddBusiness = async (business) => {
  try {
    await supabase
      .from('business')
      .insert([
        {
          name: business.name,
          cnpj: business.cnpj,
          fee_amount: business.fee_amount,
          contact: business.contact,
          email: business.email,
          city: business.city,
          state: business.state,
          regime: business.regime,
          category: business.category,
        },
      ])
      .select();
  } catch (error) {
    throw new Error('Novo error');
  }
};
const dbaAddColumn = async (column) => {
  try {
    await supabase
      .from('columns')
      .insert([
        {
          id: column.id,
          name: column.name,
          isadd: column.isadd,
          items: [],
        },
      ])
      .select();
  } catch (error) {
    throw new Error('Novo Column');
  }
};
const dbUpdateColumnItems = async (id, newItems) => {
  try {
    await supabase.from('columns').update({ items: newItems }).eq('id', id);
  } catch (error) {
    console.log('Error Update', error);
  }
};
const dbUpdateColumnName = async (column) => {
  try {
    await supabase.from('columns').update({ name: column.name }).eq('id', column.id);
  } catch (error) {
    console.log('Error Update', error);
  }
};
const dbAddPayments = async (payments) => {
  try {
    await supabase.from('payments').insert(payments).select();
  } catch (error) {
    throw new Error('Novo error');
  }
};

const dbUpdateBusiness = async (business) => {
  try {
    await supabase
      .from('business')
      .update({ name: business.name, cnpj: business.cnpj, fee_amount: business.fee_amount })
      .eq('id', business.id)
      .select();
  } catch (error) {
    console.log('Error Update', error);
  }
};

const dbDeleteBusiness = async (business) => {
  try {
    await supabase.from('business').delete().eq('id', business.id).select();
  } catch (error) {
    console.log(error);
  }
};

export {
  dbaAddBusiness,
  dbDeleteBusiness,
  dbUpdateBusiness,
  dbAddPayments,
  dbaAddColumn,
  dbUpdateColumnItems,
  dbUpdateColumnName,
};
