
import Modal from "../../../components/modal";
import useModal from "../../../hooks/useModal";
import UpdateBusinessForm from "./updatebusinessform";

const UpdateBusiness = ({id, onUpdateSuccess}) => {

const { isOpen, toggle } = useModal();

  return (
    <div>
      <div>
        <button onClick={toggle}>Editar</button>
      </div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <UpdateBusinessForm toggle={toggle} id={id} onUpdateSuccess={onUpdateSuccess}/>
      </Modal>
    </div>
  );
};

export default UpdateBusiness;
