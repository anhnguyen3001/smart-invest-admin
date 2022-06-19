import { HelpCircle, Plus } from 'react-feather';
import { Button, Col, Input, Row } from 'reactstrap';
import { useTracking } from 'utility/hooks/useTracking';
const TableHeader = (props) => {
  const { getAttrTracking } = useTracking();
  const { params, onChangeParams, onCreateDomain, onShowGuide } = props;
  return (
    <div className="w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col sm="4" className="d-flex align-items-center p-0">
          <div className="d-flex justify-content-start align-items-center w-100">
            <label htmlFor="rows-per-page">Hiển thị</label>
            <Input
              value={params?.pageSize}
              onChange={(val) =>
                onChangeParams((prev) => ({
                  ...prev,
                  pageSize: val.target.value,
                }))
              }
              className="mx-50"
              type="select"
              style={{ width: '5rem' }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </Input>
            <label htmlFor="rows-per-page">phần tử</label>
          </div>
        </Col>
        <Col
          sm="8"
          className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pe-lg-1 p-0 mt-lg-0 mt-1"
        >
          <Button
            size="sm"
            className="d-flex align-items-center ms-1"
            color="secondary"
            onClick={onShowGuide}
            {...getAttrTracking({
              regionName: 'domainTable',
              contentName: 'viewGuideBtn',
              target: 'popupDomainGuide',
            })}
          >
            <HelpCircle className="me-50" />
            Xem hướng dẫn
          </Button>
          <Button
            size="sm"
            className="d-flex align-items-center ms-1"
            color="primary"
            onClick={onCreateDomain}
            {...getAttrTracking({
              regionName: 'domainTable',
              contentName: 'addDomainBtn',
              target: 'popupAddDomain',
            })}
          >
            <Plus className="me-50" />
            Thêm tên miền mới
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default TableHeader;
