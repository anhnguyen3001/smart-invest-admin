import { AlertCircle } from 'react-feather';
import { Button, Modal, ModalBody } from 'reactstrap';

const ConfirmRemoveModal = ({ visible, onClose, title, onConfirm }) => {
  return (
    <Modal
      style={{ top: 200, width: 350 }}
      isOpen={visible}
      toggle={() => onClose()}
      fade={false}
    >
      <ModalBody className="p-2">
        <div className="d-flex justify-content-center align-items-center">
          <AlertCircle className="text-warning me-1" />
          <div>{title}</div>
        </div>
        <div className="mt-1 d-flex justify-content-center align-items-center">
          <Button
            size="sm"
            className="me-1"
            outline
            type="reset"
            onClick={() => onClose()}
          >
            Hủy
          </Button>
          <Button size="sm" color="primary" onClick={() => onConfirm()}>
            Xóa
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ConfirmRemoveModal;
