import { selectThemeColors } from 'utility/Utils';
import Select from 'react-select';
import { Col, Input, Row } from 'reactstrap';

export interface TableHeaderProps {
  keyword: string;
  onChangeKeyword: (keyword: string) => void;
  onChangeParams: (params) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  keyword,
  onChangeKeyword,
  onChangeParams,
}) => {
  return (
    <Row className="m-1 ms-2">
      <Col sm="6" className="d-flex align-items-center p-0">
        <div
          style={{ flex: 1 }}
          className="d-flex align-items-center mb-sm-0 mb-1 me-1"
        >
          <Input
            value={keyword}
            placeholder="Tìm kiếm"
            type="text"
            className="ms-50 w-100"
            onChange={(e) => onChangeKeyword(e.target.value)}
          />
        </div>
      </Col>
      <Col
        sm="6"
        className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pe-lg-1 p-0 mt-lg-0 mt-1"
      >
        <Select
          theme={selectThemeColors}
          className="react-select"
          classNamePrefix="select"
          defaultValue={{ label: 'Tất cả trạng thái', value: '' }}
          options={[
            { label: 'Tất cả trạng thái', value: '' },
            { label: 'Bản nháp', value: 'draft' },
            { label: 'Đã xuất bản', value: 'published' },
          ]}
          onChange={(newValue) =>
            onChangeParams((prev) => ({
              ...prev,
              statuses: !!newValue?.value ? newValue.value : undefined,
            }))
          }
        />
      </Col>
    </Row>
  );
};

export default TableHeader;
