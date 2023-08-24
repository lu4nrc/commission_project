import Button from '../../../components/button';
import Modal from '../../../components/modal';
import useModal from '../../../hooks/useModal';
import SalesmanForm from './salesmanform';

function CreateSalesman({ onCreateSuccess }) {
  const { isOpen, toggle } = useModal();

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold mb-4">Parceiros</h1>
        <Button onClick={toggle} label="Cadastrar Parceiro" />
      </div>
      <Modal isOpen={isOpen} toggle={toggle} title='Cadastrar'>
        <SalesmanForm toggle={toggle} onCreateSuccess={onCreateSuccess} />
      </Modal>
    </div>
  );
}

export default CreateSalesman;
