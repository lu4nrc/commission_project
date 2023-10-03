import React from 'react';
import Modal from '../../../components/modal';
import useModal from '../../../hooks/useModal';
import ColumnForm from './ColumnForm';

export default function CreateColumn({ updateColumnData, canva_id }) {
  const { isOpen, toggle } = useModal();
  return (
    <>
      <button
        className="rounded-lg bg-slate-100 border-gray-300 border border-dashed h-full p-9"
        type="button"
        onClick={toggle}
      >
        Adicionar Coluna
      </button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ColumnForm toggle={toggle} updateColumnData={updateColumnData} canva_id={canva_id} />
      </Modal>
    </>
  );
}
