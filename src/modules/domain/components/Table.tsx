import { useState } from 'react';
import UILoader from '@core/components/ui-loader';
import moment from 'moment';
import DataTable from 'react-data-table-component';
import { ChevronDown, Shield, Trash } from 'react-feather';
import ReactPaginate from 'react-paginate';
import { Badge, Button, Card, UncontrolledTooltip } from 'reactstrap';
import { swalDeleteAction, swalNoticeAction } from '../../../utility/Utils';
import { domainApi } from '../utils/api';
import TableHeader from './TableHeader';
import { useTracking } from 'utility/hooks/useTracking';

const Table = (props) => {
  const { getAttrTracking } = useTracking();
  const {
    domains,
    totalPages,
    onShowGuide,
    params,
    onChangeParams,
    loading,
    onCreateDomain,
    mutateDomains,
  } = props;
  const [isVerifying, setIsVerifying] = useState(false);

  const handlePagination = (page) => {
    onChangeParams((prev) => ({
      ...prev,
      page: page.selected + 1,
    }));
  };

  const deleteDomain = async (id) => {
    await domainApi.deleteDomain(id);
    mutateDomains();
  };

  const handleVerifyDomain = async (row) => {
    try {
      setIsVerifying(true);
      await domainApi.verifyDomain(row.id);
      swalNoticeAction(
        'Xác thực thành công!',
        'Tên miền đã được xác thực thành công.',
      );
      mutateDomains();
    } catch (err) {
      console.error(err);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDeleteDomain = (row) => {
    swalDeleteAction(
      `Xóa bản ghi ${row.domain}?`,
      'Dữ liệu sẽ không thể khôi phục sau khi xóa!',
      () => deleteDomain(row.id),
    );
  };

  const CustomPagination = () => {
    const currentPage = params?.page;
    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={totalPages || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={
          'pagination react-paginate justify-content-end my-2 pe-1'
        }
      />
    );
  };

  const columns = [
    {
      name: 'Tên miền',
      sortable: true,
      key: 'domain',
      minWidth: '300px',
      cell: (row) => (
        <div className="d-flex flex-column">
          <span className="fw-bold">{row.domain}</span>
        </div>
      ),
    },
    // {
    //   name: 'Nền tảng',
    //   sortable: true,
    //   key: 'hostingPlatform',
    //   cell: (row) => (
    //     <div className="d-flex flex-column">
    //       <div className="user_name text-truncate text-body">
    //         <span className="fw-bold">{row.hostingPlatform}</span>
    //       </div>
    //     </div>
    //   ),
    // },
    {
      name: 'Trạng thái',
      center: true,
      cell: (row) => (
        <div className="d-flex justify-content-center align-items-center">
          {row.isVerified ? (
            <Badge
              pill
              color="light-primary"
              className="pe-50 ps-50 text-capitalize"
            >
              Đã xác thực
            </Badge>
          ) : (
            <Badge
              pill
              color="light-secondary"
              className="pe-50 ps-50 text-capitalize"
            >
              Chưa xác thực
            </Badge>
          )}
        </div>
      ),
    },
    {
      name: 'Thời gian cập nhật',
      sortable: true,
      key: 'updatedAt',
      cell: (row) => (
        <div className="d-flex flex-column">
          <div className="user_name text-truncate text-body">
            <span className="fw-bold">
              {moment(row.updatedAt).format('DD/MM/YYYY - hh:mm')}
            </span>
          </div>
        </div>
      ),
    },
    {
      name: 'Thao tác',
      center: true,
      cell: (row) => (
        <div className="d-flex justify-content-center align-items-center">
          {!row.isVerified && (
            <>
              <Button
                disabled={isVerifying}
                id="verifyDomain"
                size="sm"
                color="transparent"
                className="btn btn-icon"
                onClick={() => handleVerifyDomain(row)}
              >
                <Shield className="font-medium-2" />
              </Button>

              <UncontrolledTooltip placement="top" target="verifyDomain">
                Xác thực tên miền
              </UncontrolledTooltip>
            </>
          )}
          <Button
            id="deleteDomain"
            size="sm"
            color="transparent"
            className="btn btn-icon"
            onClick={() => handleDeleteDomain(row)}
            {...getAttrTracking({
              regionName: 'domainTable',
              contentName: 'deleteDomainBtn',
              target: 'popupDelete',
            })}
          >
            <Trash className="font-medium-2" />
          </Button>
          <UncontrolledTooltip placement="top" target="deleteDomain">
            Xoá
          </UncontrolledTooltip>
        </div>
      ),
    },
  ];

  const handleSort = (sortObj, direction) => {
    onChangeParams((prev) => ({
      ...prev,
      sortBy: sortObj?.key,
      orderBy: direction?.toUpperCase?.(),
    }));
  };

  return (
    <>
      <h3 className="mb-2">Danh sách tên miền</h3>
      <Card>
        <div className="react-dataTable">
          <div className="px-2">
            <TableHeader
              {...{
                onShowGuide,
                params,
                onChangeParams,
                onCreateDomain,
              }}
            />
          </div>
          <UILoader blocking={loading}>
            <DataTable
              noHeader
              pagination
              responsive
              paginationServer
              columns={columns}
              onSort={handleSort}
              data={domains}
              sortIcon={<ChevronDown />}
              className="react-dataTable"
              paginationComponent={CustomPagination}
            />
          </UILoader>
        </div>
      </Card>
    </>
  );
};

export default Table;
