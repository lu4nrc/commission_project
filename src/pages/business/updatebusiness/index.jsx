import Modal from "../../../components/modal";
import useModal from "../../../hooks/useModal";
import UpdateBusinessForm from "./updatebusinessform";

const UpdateBusiness = ({ business, updateBusinessData }) => {
  const { isOpen, toggle } = useModal();
  return (
    <div>
      <div>
        <button onClick={toggle}>Editar</button>
      </div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <UpdateBusinessForm
          toggle={toggle}
          business={business}
          updateBusinessData={updateBusinessData}
        />
      </Modal>
    </div>
  );
};

export default UpdateBusiness;
