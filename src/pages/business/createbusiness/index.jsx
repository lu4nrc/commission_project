import Button from '../../../components/button';
import Modal from '../../../components/modal';
import useModal from '../../../hooks/useModal';
import BusinessForm from './businessform';

function CreateBusiness({ updateBusinessData }) {
  const { isOpen, toggle } = useModal();

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold mb-4 dark:text-white">Empresas</h1>
        <Button onClick={toggle} label="Criar nova Empresa" />
      </div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <BusinessForm toggle={toggle} updateBusinessData={updateBusinessData} />
      </Modal>
    </div>
  );
}

export default CreateBusiness;
