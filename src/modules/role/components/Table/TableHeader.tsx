import { PAGE_SIZE_OPTIONS } from 'modules/core';
import { Plus } from 'react-feather';
import { Button, Col, Input, Row } from 'reactstrap';
import { GetRolesParams } from '../../types';

export interface TableHeaderProps {
  params: GetRolesParams;
  onChangeKeyword: (keyword: string) => void;
  onChangeParams: (params: GetRolesParams, isResetPage?: boolean) => void;
  onCreateRole: () => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  params,
  onChangeKeyword,
  onChangeParams,
  onCreateRole,
}) => {
  return (
    <div className="m-1 ms-2">
      <Row className="gx-2 gy-1">
        <Col md="4" className="d-flex align-items-center">
          <label htmlFor="rows-per-page">Hiển thị</label>
          <Input
            value={params?.pageSize}
            onChange={(e) =>
              onChangeParams({ pageSize: parseInt(e.target.value) })
            }
            className="mx-50"
            type="select"
            style={{ width: '5rem' }}
          >
            {PAGE_SIZE_OPTIONS.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Input>
          <label htmlFor="rows-per-page">phần tử</label>
        </Col>
        <Col
          md="8"
          className="d-flex align-items-md-center justify-content-md-end justify-content-start flex-sm-nowrap flex-wrap flex-sm-row flex-column"
        >
          <Input
            value={params?.q}
            placeholder="Tìm kiếm theo tên hoặc mã role"
            type="text"
            className="w-50 mb-sm-0 mb-1 me-sm-1 me-0"
            onChange={(e) => onChangeKeyword(e.target.value)}
          />
          <Button
            size="sm"
            className="d-flex align-items-center"
            color="primary"
            onClick={onCreateRole}
          >
            <Plus className="me-50" />
            Thêm role mới
          </Button>
        </Col>
      </Row>
    </div>
  );
};
