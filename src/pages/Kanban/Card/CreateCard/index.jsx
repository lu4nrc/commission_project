import { Plus } from '@phosphor-icons/react';
import React from 'react';
import Modal from '../../../../components/modal';
import useModal from '../../../../hooks/useModal';
import CardForm from "./CardForm";

export default function CreateCard({ updateCards }) {
  const { isOpen, toggle } = useModal();

  return (
    <>
      <button className="bg-[#b9925b] rounded-md p-1" type="button" onClick={toggle}>
        <Plus size={16} color="#fff" />
      </button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <CardForm toggle={toggle} updateCards={updateCards} />
      </Modal>
    </>
  );
}
