import UILoader from '@core/components/ui-loader';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { ChevronDown, Edit, Trash } from 'react-feather';
import ReactPaginate from 'react-paginate';
import { Button, Card, UncontrolledTooltip } from 'reactstrap';
import { swalDeleteAction } from 'utility/Utils';
import { GetRolesParams, Role } from '../../types';
import { roleApi } from '../../utils/api';
import RoleModal from '../RoleModal';
import { TableHeader, TableHeaderProps } from './TableHeader';

interface TableProps
  extends Pick<TableHeaderProps, 'onChangeKeyword' | 'onChangeParams'> {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  roles: Role[];
  totalPages: number;
  params: GetRolesParams;
  mutateRoles: () => void;
}

export const Table: React.FC<TableProps> = ({
  loading,
  setLoading,
  roles,
  totalPages,
  params,
  onChangeParams,
  mutateRoles,
  ...tableHeaderProps
}) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [editedRole, setEditedRole] = useState<Role>();

  const handlePagination = (page) => {
    onChangeParams({ page: page.selected + 1 });
  };

  const deleteRole = async (id: number) => {
    await roleApi.deleteRole(id);
    mutateRoles();
  };

  const onDelete = (row: Role) => {
    swalDeleteAction(
      `Xóa role ${row.name}?`,
      'Dữ liệu sẽ không thể khôi phục sau khi xóa!',
      () => deleteRole(row.id),
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
      name: 'Tên role',
      sortable: true,
      key: 'name',
      minWidth: '150px',
      cell: (row: Role) => (
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
      name: 'Mã role',
      sortable: true,
      key: 'code',
      minWidth: '250px',
      cell: (row: Role) => (
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
      cell: (row: Role) => (
        <div className="d-flex justify-content-center align-items-center">
          <Button
            disabled={loading}
            id="editRole"
            size="sm"
            color="transparent"
            className="btn btn-icon"
            onClick={() => {
              setVisibleModal(true);
              setEditedRole(row);
            }}
          >
            <Edit className="font-medium-2" />
          </Button>

          <UncontrolledTooltip placement="top" target="editRole">
            Chỉnh sửa
          </UncontrolledTooltip>

          <Button
            id="deleteRole"
            size="sm"
            color="transparent"
            className="btn btn-icon"
            onClick={() => onDelete(row)}
          >
            <Trash className="font-medium-2" />
          </Button>
          <UncontrolledTooltip placement="top" target="deleteRole">
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
              onCreateRole: () => setVisibleModal(true),
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
              data={roles}
              sortIcon={<ChevronDown />}
              className="react-dataTable"
              paginationComponent={CustomPagination}
            />
          </UILoader>
        </div>
        <RoleModal
          title={editedRole ? 'Cập nhật role' : 'Tạo mới role'}
          visible={visibleModal}
          onClose={() => {
            setVisibleModal(false);
            setEditedRole(null);
          }}
          role={editedRole}
        />
      </Card>
    </>
  );
};
