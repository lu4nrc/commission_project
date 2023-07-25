
import Modal from "../../../components/modal";
import useModal from "../../../hooks/useModal";
import SalesmanForm from "./salesmanform";


const CreateSalesman = ({onCreateSuccess}) => {

 const { isOpen, toggle } = useModal();

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold mb-4">Parceiros</h1>
        <button onClick={toggle}>Criar nova</button>
      </div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <SalesmanForm toggle={toggle} onCreateSuccess={onCreateSuccess}/>
      </Modal>
    </div>
  );
};

export default CreateSalesman;
