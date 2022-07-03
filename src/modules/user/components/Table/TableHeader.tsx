import { PAGE_SIZE_OPTIONS } from 'modules/core';
import Select from 'react-select';
import { Col, Input, Row } from 'reactstrap';
import { selectThemeColors } from 'utility/Utils';
import { GetUsersParams } from '../../types';

const statusOptions = [
  { label: 'Tất cả trạng thái', value: '' },
  { label: 'Đã xác thực', value: 'true' },
  { label: 'Chưa xác thực', value: 'false' },
];

export interface TableHeaderProps {
  params: GetUsersParams;
  onChangeKeyword: (keyword: string) => void;
  onChangeParams: (params: GetUsersParams, isResetPage?: boolean) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  params,
  onChangeKeyword,
  onChangeParams,
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
            defaultValue=""
            value={params?.q}
            placeholder="Tìm kiếm"
            type="text"
            className="w-50 mb-sm-0 mb-1 me-sm-1 me-0"
            onChange={(e) => {
              onChangeKeyword(e.target.value);
            }}
          />
          <Select
            theme={selectThemeColors}
            className="react-select w-50"
            classNamePrefix="select"
            defaultValue={statusOptions[0]}
            value={
              statusOptions[
                statusOptions.findIndex(
                  ({ value }) => value === `${params.isVerified}`,
                )
              ]
            }
            options={statusOptions}
            onChange={(newValue) =>
              onChangeParams({ isVerified: newValue.value })
            }
          />
        </Col>
      </Row>
    </div>
  );
};

export default TableHeader;
