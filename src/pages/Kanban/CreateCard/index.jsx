import { Plus } from '@phosphor-icons/react';
import React from 'react';
import Modal from '../../../components/modal';
import useModal from '../../../hooks/useModal';
import CardForm from '../CreateCard/CardForm';

export default function CreateCard({ updateCardData }) {
  const { isOpen, toggle } = useModal();

  return (
    <>
      <button className="bg-emerald-500 rounded-md p-2" type="button" onClick={toggle}>
        <Plus size={16} color="#fff" />
      </button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <CardForm toggle={toggle} updateCardData={updateCardData} />
      </Modal>
    </>
  );
}
