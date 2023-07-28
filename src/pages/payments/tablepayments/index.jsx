import { DotsThreeVertical } from "@phosphor-icons/react";
import React, { useState } from "react";
import TableItem from "./tableitem";

const TablePayments = ({ data }) => {



// Função para organizar o array de pagamentos e datas
const groupPagamentosByData = (pagamentos) => {
  const pagamentosOrganizados = [];
  let dataAnterior = null;

  pagamentos.forEach((pagamento) => {
    const dataPagamento = pagamento.due_date; // Certifique-se de que a propriedade "data" esteja correta

    if (dataPagamento !== dataAnterior) {
      pagamentosOrganizados.push({ data: dataPagamento });
    }

    pagamentosOrganizados.push({ ...pagamento });
    dataAnterior = dataPagamento;
  });

  return pagamentosOrganizados;
};

const pagamentosAgrupadosPorData = groupPagamentosByData(data);

  return (
    <div className=" p-2 mt-2 border-b border-gray-200 sm:rounded-lg mx-3">
      <table className=" border-separate border-spacing-y-2 min-w-full ">
        <thead>
          <tr>
            <th className=" text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              nome / empresa
            </th>
            <th className=" text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Valor
            </th>
            <th className=" text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Data de Pag.
            </th>
            <th className=" text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className=" text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Opcões
            </th>
          </tr>
        </thead>
        <tbody className="">
         {pagamentosAgrupadosPorData &&
            pagamentosAgrupadosPorData.map((item, index) => {
              return <TableItem  key={index} item={item} />;
            })} 
        </tbody>
      </table>
    </div>
  );
};

export default TablePayments;
