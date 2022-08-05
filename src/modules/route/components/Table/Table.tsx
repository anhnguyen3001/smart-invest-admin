import UILoader from '@core/components/ui-loader';
import { ComponentWithPermission } from 'components';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { ChevronDown, Edit, Trash } from 'react-feather';
import ReactPaginate from 'react-paginate';
import { Button, Card, UncontrolledTooltip } from 'reactstrap';
import { ACTION, RESOURCES } from 'router/permission';
import { swalDeleteAction } from 'utility/Utils';
import { GetRoutesParams, Route } from '../../types';
import { routeApi } from '../../utils/api';
import RouteModal from '../RouteModal';
import { TableHeader, TableHeaderProps } from './TableHeader';

interface TableProps
  extends Pick<TableHeaderProps, 'onChangeKeyword' | 'onChangeParams'> {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  routes: Route[];
  totalPages: number;
  params: GetRoutesParams;
  mutateRoutes: () => void;
}

export const Table: React.FC<TableProps> = ({
  loading,
  setLoading,
  routes,
  totalPages,
  params,
  onChangeParams,
  mutateRoutes,
  ...tableHeaderProps
}) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [editedRoute, setEditedRoute] = useState<Route>();

  const handlePagination = (page) => {
    onChangeParams({ page: page.selected + 1 });
  };

  const deleteRoute = async (id: number) => {
    await routeApi.deleteRoute(id);
    mutateRoutes();
  };

  const onDelete = (row: Route) => {
    swalDeleteAction(
      `Xóa đường dẫn ${row.regUri}?`,
      'Dữ liệu sẽ không thể khôi phục sau khi xóa!',
      () => deleteRoute(row.id),
    );
  };

  const CustomPagination = () => {
    const currentPage = params?.page;
    return (
      <ReactPaginate
        pageCount={totalPages || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={handlePagination}
        pageClassName="page-item"
        nextLabel=""
        nextLinkClassName="page-link"
        nextClassName="page-item next"
        previousLabel=""
        previousClassName="page-item prev"
        previousLinkClassName="page-link"
        pageLinkClassName="page-link"
        containerClassName="pagination react-paginate justify-content-end my-2 pe-1"
      />
    );
  };

  const columns = [
    {
      name: 'Đường dẫn',
      sortable: true,
      key: 'regUri',
      minWidth: '150px',
      cell: (row: Route) => (
        <>
          <div id="regUri" className="text-truncate">
            {row.regUri}
          </div>
          <UncontrolledTooltip placement="top" target="regUri">
            {row.regUri}
          </UncontrolledTooltip>
        </>
      ),
    },
    {
      name: 'Phương thức',
      key: 'method',
      cell: (row: Route) => row.method,
    },
    {
      name: 'Quyền',
      key: 'permission',
      minWidth: '250px',
      cell: (row: Route) => row.permission?.code,
    },
    {
      name: 'Thao tác',
      center: true,
      cell: (row: Route) => (
        <div className="d-flex justify-content-center align-items-center">
          <ComponentWithPermission
            permission={{ resource: RESOURCES.ROUTE, action: ACTION.DELETE }}
          >
            <>
              <Button
                disabled={loading}
                id="editRoute"
                size="sm"
                color="transparent"
                className="btn btn-icon"
                onClick={() => {
                  setVisibleModal(true);
                  setEditedRoute(row);
                }}
              >
                <Edit className="font-medium-2" />
              </Button>
              <UncontrolledTooltip placement="top" target="editRoute">
                Chỉnh sửa
              </UncontrolledTooltip>
            </>
          </ComponentWithPermission>

          <ComponentWithPermission
            permission={{ resource: RESOURCES.ROUTE, action: ACTION.DELETE }}
          >
            <>
              <Button
                id="deleteRoute"
                size="sm"
                color="transparent"
                className="btn btn-icon"
                onClick={() => onDelete(row)}
              >
                <Trash className="font-medium-2" />
              </Button>
              <UncontrolledTooltip placement="top" target="deleteRoute">
                Xoá
              </UncontrolledTooltip>
            </>
          </ComponentWithPermission>
        </div>
      ),
    },
  ];

  const handleSort = (sortObj, direction) => {
    onChangeParams(
      {
        sortBy: sortObj?.key,
        orderBy: direction?.toUpperCase?.(),
      },
      false,
    );
  };

  return (
    <>
      <h3 className="mb-2">Danh sách đường dẫn</h3>
      <Card>
        <div className="react-dataTable">
          <TableHeader
            {...{
              ...tableHeaderProps,
              params,
              onChangeParams,
              onCreateRoute: () => setVisibleModal(true),
            }}
          />

          <UILoader blocking={loading}>
            <DataTable
              noHeader
              pagination
              responsive
              paginationServer
              columns={columns}
              onSort={handleSort}
              data={routes}
              sortIcon={<ChevronDown />}
              className="react-dataTable"
              paginationComponent={CustomPagination}
            />
          </UILoader>
        </div>
        <RouteModal
          title={editedRoute ? 'Cập nhật đường dẫn' : 'Tạo mới đường dẫn'}
          visible={visibleModal}
          onClose={() => {
            setVisibleModal(false);
            setEditedRoute(null);
          }}
          route={editedRoute}
          onAfterClose={mutateRoutes}
        />
      </Card>
    </>
  );
};
