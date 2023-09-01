import { createClient } from '@supabase/supabase-js';

const projectURL = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const projectKey = import.meta.env.VITE_PROJECT_ANON_KEY_SUPABASE;

export const supabase = createClient(projectURL, projectKey);

const dbaAddBusiness = async (business) => {
  try {
    await supabase.from('business').insert([
      {
        name: business.name,
        cnpj: business.cnpj,
        fee_amount: business.fee_amount,
        contact: business.contact,
        email: business.email,
        city: business.city,
        state: business.state,
        regime: business.regime,
        comments: business.comments,
        category: business.category,
        invoicing: business.invoicing,
        temperature: business.temperature,
        collaborators: business.collaborators,
      },
    ]);
  } catch (error) {
    console.log('supabase.js');
    throw error;
  }
};

const dbaAddColumn = async (column) => {
  try {
    await supabase.from('columns').insert([
      {
        id: column.id,
        name: column.name,
        isadd: column.isadd,
        items: [],
      },
    ]);
  } catch (error) {
    console.log('supabase.js:');
    throw error;
  }
};

const dbUpdateColumnItems = async (id, newItems) => {
  console.log(id, newItems)
  async function extractIds(inputArray) {
    const updateData = [];
    await inputArray.map((item) => updateData.push({ id: item.id }));
    return updateData;
  }
  try {
    const dataItems = await extractIds(newItems);
    await supabase.from('columns').update({ items: dataItems }).eq('id', id);
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
      .update({
        name: business.name,
        cnpj: business.cnpj,
        fee_amount: business.fee_amount,
        contact: business.contact,
        email: business.email,
        city: business.city,
        state: business.state,
        regime: business.regime,
        category: business.category,
        invoicing: business.invoicing,
        collaborators: business.collaborators,
      })
      .eq('id', business.id)
      .select();
  } catch (error) {
    console.log('Error Update');
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
