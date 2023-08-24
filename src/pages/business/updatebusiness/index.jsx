import Modal from "../../../components/modal";
import useModal from "../../../hooks/useModal";
import UpdateBusinessForm from "./updatebusinessform";

function UpdateBusiness ({ business, updateBusinessData })  {
  const { isOpen, toggle } = useModal();
  return (
    <div>
      <div>
        <button onClick={toggle}>Editar</button>
      </div>
      <Modal isOpen={isOpen} toggle={toggle} title="Atualizar Dados">
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
