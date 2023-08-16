import { DotsThreeVertical } from '@phosphor-icons/react';
import React from 'react';
import Modal from '../../../components/modal';
import useModal from '../../../hooks/useModal';
import ColumnForm from './ColumnForm';

export default function UpdateColumn({ column, updateColumnData }) {
  const { isOpen, toggle } = useModal();
  return (
    <>
      <button className="" type="button" onClick={toggle}>
        <DotsThreeVertical size={24} color="gray" />
      </button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ColumnForm toggle={toggle} column={column} updateColumnData={updateColumnData} />
      </Modal>
    </>
  );
}
