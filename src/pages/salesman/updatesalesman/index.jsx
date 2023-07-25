import Modal from "../../../components/modal";
import useModal from "../../../hooks/useModal";
import UpdateSalesmanForm from "./updatesalesmanform";



const UpdateSalesman = ({id, onUpdateSuccess}) => {

const { isOpen, toggle } = useModal();

  return (
    <div>
      <div>
        <button onClick={toggle}>Editar</button>
      </div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <UpdateSalesmanForm toggle={toggle} id={id} onUpdateSuccess={onUpdateSuccess}/>
      </Modal>
    </div>
  );
};

export default UpdateSalesman;