import React from 'react';
import {
  ListGroup,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
} from 'reactstrap';
import DnsRecord from './DnsRecord';

const DomainGuideLine = ({ showGuide, handleToggleShowGuide }) => {
  return (
    <Offcanvas
      style={{ width: 500, textAlign: 'justify' }}
      scrollable
      direction={'end'}
      isOpen={showGuide}
      toggle={handleToggleShowGuide}
    >
      <OffcanvasHeader
        toggle={handleToggleShowGuide}
        className="px-4 border-bottom"
      >
        Hướng dẫn
      </OffcanvasHeader>
      <OffcanvasBody className="my-auto mx-0 px-4 flex-grow-0">
        <div className="mb-1">
          <h6>
            Bước 1: Trỏ tên miền của bạn về hosting của Teko Landing Builder
          </h6>
          <p className="fw-bolder">Trỏ tên miền chính</p>
          <p>
            Vào phần quản trị tên miền ở nơi bạn mua tên miền và cấu hình 2 bản
            ghi sau để điều hướng tên miền đó về địa chỉ của Teko Page Builder:
          </p>
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
          <p className="fw-bolder">Trỏ tên miền phụ</p>
          <p>
            Giả sử tên miền chính là example.com, và bạn muốn tạo một tên miền
            phụ là abc.example.com thì chọn tên miền chính bạn muốn cài đặt, sau
            đó tạo một bản ghi mới với các giá trị như sau:
          </p>
          <ListGroup className="mb-1">
            <DnsRecord
              host="abc"
              type="CNAME"
              pointTo="kdc-dev.landingbuilder.vn"
            />
          </ListGroup>
        </div>

        <div className="mb-1">
          <h6>
            Bước 2: Tạo và xác thực tên miền của bạn tại Teko Landing Builder
          </h6>
        </div>
        <h6 className="mb-1">Bước 3: Bật SSL</h6>
        <h6>Bước 4: Xuất bản Landing Page với tên miền của bạn</h6>
      </OffcanvasBody>
    </Offcanvas>
  );
};

export default DomainGuideLine;
