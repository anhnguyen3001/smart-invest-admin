import UILoader from '@core/components/ui-loader';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { ChevronDown, Edit, Trash } from 'react-feather';
import ReactPaginate from 'react-paginate';
import { Button, Card, UncontrolledTooltip } from 'reactstrap';
import { swalDeleteAction } from 'utility/Utils';
import { GetPermissionsParams, Permission } from '../../types';
import { permissionApi } from '../../utils/api';
import PermissionModal from '../PermissionModal';
import TableHeader, { TableHeaderProps } from './TableHeader';

interface TableProps
  extends Pick<TableHeaderProps, 'onChangeKeyword' | 'onChangeParams'> {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  permissions: Permission[];
  totalPages: number;
  params: GetPermissionsParams;
  mutatePermissions: () => void;
}

export const Table: React.FC<TableProps> = ({
  loading,
  setLoading,
  permissions,
  totalPages,
  params,
  onChangeParams,
  mutatePermissions,
  ...tableHeaderProps
}) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [editedPermission, setEditedPermission] = useState<Permission>();

  const handlePagination = (page) => {
    onChangeParams({ page: page.selected + 1 });
  };

  const deletePermission = async (id: number) => {
    await permissionApi.deletePermission(id);
    mutatePermissions();
  };

  const onDelete = (row: Permission) => {
    swalDeleteAction(
      `Xóa quyền ${row.name}?`,
      'Dữ liệu sẽ không thể khôi phục sau khi xóa!',
      () => deletePermission(row.id),
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
      name: 'Tên quyền',
      sortable: true,
      key: 'name',
      minWidth: '150px',
      cell: (row: Permission) => (
        <>
          <div id="name" className="text-truncate">
            {row.name}
          </div>
          <UncontrolledTooltip placement="top" target="name">
            {row.name}
          </UncontrolledTooltip>
        </>
      ),
    },
    {
      name: 'Mã quyền',
      sortable: true,
      key: 'code',
      minWidth: '250px',
      cell: (row: Permission) => (
        <>
          <div className="text-truncate" id="code">
            {row.code}
          </div>
          <UncontrolledTooltip placement="top" target="code">
            {row.code}
          </UncontrolledTooltip>
        </>
      ),
    },
    {
      name: 'Thao tác',
      center: true,
      cell: (row: Permission) => (
        <div className="d-flex justify-content-center align-items-center">
          <Button
            disabled={loading}
            id="editPermission"
            size="sm"
            color="transparent"
            className="btn btn-icon"
            onClick={() => {
              setVisibleModal(true);
              setEditedPermission(row);
            }}
          >
            <Edit className="font-medium-2" />
          </Button>

          <UncontrolledTooltip placement="top" target="editPermission">
            Chỉnh sửa
          </UncontrolledTooltip>

          <Button
            id="deletePermission"
            size="sm"
            color="transparent"
            className="btn btn-icon"
            onClick={() => onDelete(row)}
          >
            <Trash className="font-medium-2" />
          </Button>
          <UncontrolledTooltip placement="top" target="deletePermission">
            Xoá
          </UncontrolledTooltip>
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
      <h3 className="mb-2">Danh sách quyền</h3>
      <Card>
        <div className="react-dataTable">
          <TableHeader
            {...{
              ...tableHeaderProps,
              params,
              onChangeParams,
              onCreatePermission: () => setVisibleModal(true),
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
              data={permissions}
              sortIcon={<ChevronDown />}
              className="react-dataTable"
              paginationComponent={CustomPagination}
            />
          </UILoader>
        </div>
        <PermissionModal
          title={editedPermission ? 'Cập nhật quyền' : 'Tạo mới quyền'}
          visible={visibleModal}
          onClose={() => {
            setVisibleModal(false);
            setEditedPermission(null);
          }}
          permission={editedPermission}
          onAfterClose={mutatePermissions}
        />
      </Card>
    </>
  );
};
