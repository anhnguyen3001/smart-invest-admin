import React from 'react';
import { CheckCircle, Copy, Info } from 'react-feather';
import toast from 'react-hot-toast';
import {
  Input,
  ListGroup,
  Modal,
  ModalBody,
  ModalHeader,
  UncontrolledTooltip,
} from 'reactstrap';
import DnsRecord from './DnsRecord';

const QuickGuideModal = ({ domain, visible, setVisible }) => {
  const onCopyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Sao chép thành công');
  };

  return (
    <>
      <Modal isOpen={visible} toggle={() => setVisible(!visible)}>
        <ModalHeader
          className="bg-transparent"
          toggle={() => setVisible(!visible)}
        ></ModalHeader>
        <ModalBody className="px-5 pb-5">
          <div className="text-center">
            <CheckCircle color="#53c305" className="mb-1" />
            <h5>Tên miền của bạn được tạo thành công</h5>
            <div className="row">
              <div className="col-sm-10">
                <Input
                  className="text-dark"
                  type="text"
                  id="readonlyInput"
                  readOnly
                  value={domain}
                />
              </div>
              <div className="col-sm-2">
                <Copy
                  id="copyDomain"
                  size={15}
                  style={{ marginLeft: 5, cursor: 'pointer', outline: 'none' }}
                  onClick={() => onCopyText(domain)}
                />
                <UncontrolledTooltip placement="left" target="copyDomain">
                  Sao chép
                </UncontrolledTooltip>
              </div>
            </div>
          </div>
          <div className="text-dark mt-1">
            <Info size={15} style={{ marginRight: 5, marginBottom: 2 }} />
            Bạn hãy thêm các bản ghi này vào cài đặt DNS của tên miền
          </div>
          <ListGroup className="mb-1">
            <DnsRecord
              title="Bản ghi bắt buộc"
              host="www"
              type="CNAME"
              pointTo="kdc-dev.landingbuilder.vn"
            />
            <DnsRecord
              title="Bản ghi tùy chọn"
              host="@"
              type="A"
              pointTo="103.161.38.150"
              note="Khi thêm bản ghi này, truy cập tên miền example.com sẽ được
              chuyển hướng về tên miền www.example.com"
            />
          </ListGroup>
        </ModalBody>
      </Modal>
    </>
  );
};

export default QuickGuideModal;
