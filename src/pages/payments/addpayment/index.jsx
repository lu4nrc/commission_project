import React, { useState } from "react";
import FormPayments from "./formpayments";
import useModal from "../../../hooks/useModal";
import Modal from "../../../components/modal";
import Button from "../../../components/button";

function AddPayments({ onCreateSuccess }) {
  const { isOpen, toggle } = useModal();

  return (
    <div>
      <div className="flex justify-between p-3">
        <h1 className=" text-3xl font-semibold">Pagamentos</h1>
        <Button onClick={toggle} label="Criar novo pagamento" />
      </div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <FormPayments toggle={toggle} onCreateSuccess={onCreateSuccess} />
      </Modal>
    </div>
  );
}

export default AddPayments;
