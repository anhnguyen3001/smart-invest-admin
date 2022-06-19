import UILoader from '@core/components/ui-loader';
import { PAGE_BUILDER, PAGE_PREVIEW } from 'router/path';
import { swalDeleteAction } from 'utility/Utils';
import moment from 'moment';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { ChevronDown, Copy, Eye, Trash } from 'react-feather';
import ReactPaginate from 'react-paginate';
import { Link, useHistory } from 'react-router-dom';
import { Badge, Button, Card } from 'reactstrap';
import pageApi from '../utils/api';
import { getPublishUrl } from '../utils/common';
import PageModal from './PageModal';
import TableHeader from './TableHeader';
import { useTracking } from 'utility/hooks/useTracking';

const Table = (props) => {
  const {
    pages,
    totalPages,
    keyword,
    onChangeKeyword,
    params,
    onChangeParams,
    loading,
    mutatePages,
  } = props;
  const [duplicateItem, setDuplicateItem] = useState<any>();
  const history = useHistory();
  const [visibleDuplicate, setVisibleDuplicate] = useState(false);
  const { getAttrTracking, trackManual } = useTracking();
  const handlePagination = (page) => {
    onChangeParams((prev) => ({
      ...prev,
      page: page.selected + 1,
    }));
  };

  const handleDuplicatePage = async (page) => {
    const _page = await pageApi.getPage(page.id).then((res) => res?.data?.page);
    setDuplicateItem(
      _page && {
        ..._page,
        designMode: _page.designMode || 'responsive',
      },
    );
    setVisibleDuplicate(true);
  };

  const deletePage = async (id) => {
    await pageApi.deletePage(id);
    mutatePages();
  };

  const handleDeletePage = (page) => {
    return swalDeleteAction(
      `Xóa bản ghi ${page.name}?`,
      'Dữ liệu sẽ không thể khôi phục sau khi xóa!',
      () => deletePage(page.id),
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
      name: 'Tên trang',
      sortable: true,
      key: 'name',
      minWidth: '300px',
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center w-100">
          <div className="d-flex flex-column w-100">
            <div
              className="page-name text-body w-100"
              title={row.name}
              onClick={() => {
                history.push(PAGE_BUILDER.replace(':id', row.id));
              }}
            >
              {row.name}
            </div>

            {row.status === 'published' && (
              <a
                className="mt-50"
                onClick={(e) => e.stopPropagation()}
                href={getPublishUrl(row)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {getPublishUrl(row)}
              </a>
            )}
          </div>
        </div>
      ),
    },
    {
      name: 'Thời gian cập nhật',
      sortable: true,
      key: 'updatedAt',

      cell: (row) => (
        <div className="d-flex flex-column">
          <div
            className="text-truncate text-body"
            onClick={() => {
              history.push(PAGE_BUILDER.replace(':id', row.id));
            }}
          >
            <span className="fw-bold">
              {moment(row.updatedAt).format('DD/MM/YYYY - hh:mm')}
            </span>
          </div>
        </div>
      ),
    },
    {
      name: 'Người chỉnh sửa',
      key: 'updatedBy',
      cell: (row) => {
        const { updatedBy } = row || {};
        return (
          <div className="d-flex flex-column">
            <div
              className="text-truncate text-body"
              onClick={() => {
                history.push(PAGE_BUILDER.replace(':id', row.id));
              }}
            >
              <span className="fw-bold">
                {updatedBy?.name || updatedBy?.email || updatedBy?.phoneNumber}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      name: 'Trạng thái',
      center: true,
      cell: (row) => (
        <div
          className="d-flex justify-content-center align-items-center"
          onClick={() => {
            history.push(PAGE_BUILDER.replace(':id', row.id));
          }}
        >
          {row.status === 'published' ? (
            <Badge
              pill
              color="light-primary"
              className="pe-50 ps-50 text-capitalize"
            >
              Đã xuất bản
            </Badge>
          ) : (
            <Badge
              pill
              color="light-secondary"
              className="pe-50 ps-50 text-capitalize"
            >
              Bản nháp
            </Badge>
          )}
        </div>
      ),
    },
    {
      name: 'Thao tác',
      center: true,
      cell: (row) => (
        <div className="d-flex justify-content-center align-items-center">
          <Link to={PAGE_PREVIEW.replace(':id', row.id)}>
            <Button
              size="sm"
              color="transparent"
              className="btn btn-icon"
              onClick={() => {}}
              {...getAttrTracking({
                regionName: 'pageListTable',
                contentName: 'viewpageBtn',
                target: 'pagePreview',
              })}
            >
              <Eye className="font-medium-2" />
            </Button>
          </Link>
          <Button
            size="sm"
            color="transparent"
            className="btn btn-icon"
            onClick={() => handleDuplicatePage(row)}
            {...getAttrTracking({
              regionName: 'pageListTable',
              contentName: 'duplicatePageBtn',
              target: 'pageList',
            })}
          >
            <Copy className="font-medium-2" />
          </Button>
          <Button
            size="sm"
            color="transparent"
            className="btn btn-icon"
            onClick={() => handleDeletePage(row)}
            {...getAttrTracking({
              regionName: 'pageListTable',
              contentName: 'deletePageBtn',
              target: 'popupDelete',
            })}
          >
            <Trash className="font-medium-2" />
          </Button>
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
      <h3 className="mb-2">Danh sách trang</h3>
      <Card>
        <div className="react-dataTable">
          <TableHeader
            {...{
              keyword,
              onChangeKeyword,
              params,
              onChangeParams,
            }}
          />

          <UILoader blocking={loading}>
            <DataTable
              theme="default"
              noHeader
              pagination
              responsive
              paginationServer
              columns={columns}
              onSort={handleSort}
              data={pages}
              sortIcon={<ChevronDown />}
              className="react-dataTable"
              paginationComponent={CustomPagination}
              onRowClicked={(row) => {
                history.push(PAGE_BUILDER.replace(':id', row.id));
                trackManual({
                  regionName: 'pageListTable',
                  contentName: 'viewpageBtn',
                  target: 'pageBuilder',
                });
              }}
              conditionalRowStyles={[
                {
                  when: (_) => true,
                  style: { cursor: 'pointer' },
                },
              ]}
            />
          </UILoader>
          <PageModal
            title="Nhân bản trang"
            visible={visibleDuplicate}
            setVisible={setVisibleDuplicate}
            pageName={'Copy of ' + duplicateItem?.name}
            defaultBody={{
              pbConfig: duplicateItem?.pbConfig,
              mobilePbConfig: duplicateItem?.mobilePbConfig,
              designMode: duplicateItem?.designMode,
            }}
            hideChooseDesignMode
          />
        </div>
      </Card>
    </>
  );
};

export default Table;
