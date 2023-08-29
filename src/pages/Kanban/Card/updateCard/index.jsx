import { DotsThree } from '@phosphor-icons/react';
import Modal from '../../../../components/modal';
import useModal from '../../../../hooks/useModal';
import UpdateCardForm from './updateCardFom';

function UpdateCard({ cardInfor, setCardInfor }) {
  const { isOpen, toggle } = useModal();
  return (
    <div>
      <div>
        <button onClick={toggle}>
          <DotsThree color="gray" size={24} />
        </button>
      </div>
      <Modal isOpen={isOpen} toggle={toggle} title="Atualizar Dados">
        <UpdateCardForm toggle={toggle} cardInfor={cardInfor} setCardInfor={setCardInfor} />
      </Modal>
    </div>
  );
}

export default UpdateCard;
