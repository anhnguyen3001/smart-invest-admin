import UILoader from '@core/components/ui-loader';
import { ComponentWithPermission } from 'components';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { ChevronDown, Edit, Trash } from 'react-feather';
import ReactPaginate from 'react-paginate';
import { Button, Card, Input, UncontrolledTooltip } from 'reactstrap';
import { useAppSelector } from 'redux/store';
import { ACTION, RESOURCES } from 'router/permission';
import {
  checkPermission,
  swalDeleteAction,
  swalWarningAction,
} from 'utility/Utils';
import { MAPPING_LOGIN_METHOD } from '../../constants';
import { GetUsersParams, User } from '../../types';
import { userApi } from '../../utils/api';
import UserModal from '../UserModal';
import TableHeader, { TableHeaderProps } from './TableHeader';

interface TableProps
  extends Pick<TableHeaderProps, 'onChangeKeyword' | 'onChangeParams'> {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  users: User[];
  totalPages: number;
  params: GetUsersParams;
  mutateUsers: () => void;
}

export const Table: React.FC<TableProps> = ({
  loading,
  setLoading,
  users,
  totalPages,
  params,
  onChangeParams,
  mutateUsers,
  ...tableHeaderProps
}) => {
  const user = useAppSelector((state) => state.auth.user);
  const [editedUser, setEditedUser] = useState<User>();

  const handlePagination = (page) => {
    onChangeParams({ page: page.selected + 1 });
  };

  const deleteUser = async (id) => {
    await userApi.deleteUser(id);
    mutateUsers();
  };

  const onDeleteUser = (row: User) => {
    swalDeleteAction(
      `Xóa bản ghi ${row.email}?`,
      'Dữ liệu sẽ không thể khôi phục sau khi xóa!',
      () => deleteUser(row.id),
    );
  };

  const verifyUser = async (userId: number, isVerified: boolean) => {
    try {
      setLoading(true);
      await userApi.updateUser(userId, { isVerified });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const onVerifyUser = async (row: User) => {
    swalWarningAction(
      `Xác thực tài khoản ${row.email}?`,
      `Người sẽ có thể đăng nhập được sau khi xác thực!`,
      () => verifyUser(row.id, !row.isVerified),
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
      name: 'Tên',
      sortable: true,
      key: 'username',
      minWidth: '150px',
      cell: (row: User) => <div className="username">{row.username}</div>,
    },
    {
      name: 'Email',
      sortable: true,
      key: 'username',
      minWidth: '250px',
      cell: (row: User) => (
        <>
          <div className="text-truncate" id="email">
            {row.email}
          </div>
          <UncontrolledTooltip placement="top" target="email">
            {row.email}
          </UncontrolledTooltip>
        </>
      ),
    },
    {
      name: 'Role',
      key: 'rolemethod',
      align: 'center',
      cell: (row: User) => row.role?.name,
    },
    {
      name: 'Phương thức',
      key: 'method',
      align: 'center',
      cell: (row: User) => MAPPING_LOGIN_METHOD[row.method],
    },
    {
      name: 'Xác thực',
      center: true,
      cell: (row: User) => (
        <div className="form-switch">
          <Input
            type="switch"
            checked={row.isVerified}
            readOnly={
              !checkPermission(
                { resource: RESOURCES.USER, action: ACTION.UPDATE },
                user,
              )
            }
            onChange={() => {
              onVerifyUser(row);
            }}
          />
        </div>
      ),
    },
    {
      name: 'Thời gian cập nhật',
      sortable: true,
      key: 'updatedAt',
      cell: (row: User) => {
        const updatedAt = new Date(row.updatedAt).toLocaleString();
        return (
          <>
            <div id="updatedAt" className="text-truncate">
              {updatedAt}
            </div>
            <UncontrolledTooltip target="updatedAt">
              {updatedAt}
            </UncontrolledTooltip>
          </>
        );
      },
    },
    {
      name: 'Thao tác',
      center: true,
      cell: (row: User) => (
        <div className="d-flex justify-content-center align-items-center">
          <ComponentWithPermission
            permission={{ resource: RESOURCES.USER, action: ACTION.UPDATE }}
          >
            <>
              <Button
                disabled={loading}
                id="editUser"
                size="sm"
                color="transparent"
                className="btn btn-icon"
                onClick={() => setEditedUser(row)}
              >
                <Edit className="font-medium-2" />
              </Button>

              <UncontrolledTooltip placement="top" target="editUser">
                Chỉnh sửa
              </UncontrolledTooltip>
            </>
          </ComponentWithPermission>

          <ComponentWithPermission
            permission={{ resource: RESOURCES.USER, action: ACTION.DELETE }}
          >
            <>
              <Button
                id="deleteUser"
                size="sm"
                color="transparent"
                className="btn btn-icon"
                onClick={() => onDeleteUser(row)}
              >
                <Trash className="font-medium-2" />
              </Button>
              <UncontrolledTooltip placement="top" target="deleteUser">
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
      <h3 className="mb-2">Danh sách người dùng</h3>
      <Card>
        <div className="react-dataTable">
          <TableHeader
            {...{
              ...tableHeaderProps,
              params,
              onChangeParams,
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
              data={users}
              sortIcon={<ChevronDown />}
              className="react-dataTable"
              paginationComponent={CustomPagination}
            />
          </UILoader>
        </div>

        <UserModal
          title="Cập nhật thông tin người dùng"
          visible={!!editedUser}
          onClose={() => setEditedUser(null)}
          user={editedUser}
          onAfterClose={mutateUsers}
        />
      </Card>
    </>
  );
};
