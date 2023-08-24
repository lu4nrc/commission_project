import { DotsThree, DotsThreeVertical } from "@phosphor-icons/react";
import Modal from "../../../components/modal";
import useModal from "../../../hooks/useModal";
import UpdateSalesmanForm from "./updatesalesmanform";



const UpdateSalesman = ({id, onUpdateSuccess}) => {

const { isOpen, toggle } = useModal();

  return (
    <th>
      <div>
        <button className="bg-white" onClick={toggle}><DotsThreeVertical color="gray" size={32} /></button>
      </div>
      <Modal isOpen={isOpen} toggle={toggle} title="Atualizar Dados">
        <UpdateSalesmanForm toggle={toggle} id={id} onUpdateSuccess={onUpdateSuccess}/>
      </Modal>
    </th>
  );
};

export default UpdateSalesman;