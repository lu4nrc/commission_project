
import Button from "../../../components/button";
import Modal from "../../../components/modal";
import useModal from "../../../hooks/useModal";
import BusinessForm from "./businessform";

const CreateBusiness = ({onCreateSuccess}) => {

 const { isOpen, toggle } = useModal();

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold mb-4">Empresas</h1>
        <Button onClick={toggle} label="Criar nova Empresa"/>
      </div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <BusinessForm toggle={toggle} onCreateSuccess={onCreateSuccess}/>
      </Modal>
    </div>
  );
};

export default CreateBusiness;