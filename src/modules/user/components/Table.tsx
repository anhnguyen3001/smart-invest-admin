import UILoader from '@core/components/ui-loader';
import moment from 'moment';
import DataTable from 'react-data-table-component';
import { ChevronDown, Shield, Trash } from 'react-feather';
import ReactPaginate from 'react-paginate';
import { Badge, Button, Card, UncontrolledTooltip } from 'reactstrap';
import { swalDeleteAction, swalWarningAction } from '../../../utility/Utils';
import { GetUsersParams, User } from '../types';
import { userApi } from '../utils/api';
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

const Table: React.FC<TableProps> = ({
  loading,
  setLoading,
  users,
  totalPages,
  params,
  onChangeParams,
  mutateUsers,
  ...tableHeaderProps
}) => {
  const handlePagination = (page) => {
    onChangeParams((prev) => ({
      ...prev,
      page: page.selected + 1,
    }));
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
      name: 'Tài khoản',
      sortable: true,
      key: 'username',
      minWidth: '300px',
      cell: (row: User) => (
        <div className="d-flex flex-column">
          <div className="username">{row.username}</div>
          <div className="mt-50 text-secondary">{row.email}</div>
        </div>
      ),
    },
    {
      name: 'Vai trò',
      sortable: true,
      key: 'role',
      cell: (row: User) => {
        const { name } = row.role || {};
        if (!name) {
          return <div className="text-secondary">Chưa có vai trò</div>;
        }

        return <div className="text-truncate">{name}</div>;
      },
    },
    {
      name: 'Trạng thái',
      center: true,
      cell: (row: User) => (
        <>
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
        </>
      ),
    },
    {
      name: 'Thời gian cập nhật',
      sortable: true,
      key: 'updatedAt',
      cell: (row: User) => (
        <div className="text-truncate">
          {moment(row.updatedAt).format('DD/MM/YYYY - hh:mm')}
        </div>
      ),
    },
    {
      name: 'Thao tác',
      center: true,
      cell: (row) => (
        <div className="d-flex justify-content-center align-items-center">
          <Button
            disabled={loading}
            id="verifyUser"
            size="sm"
            color="transparent"
            className="btn btn-icon"
            onClick={() => onVerifyUser(row)}
          >
            <Shield className="font-medium-2" />
          </Button>

          <UncontrolledTooltip placement="top" target="verifyUser">
            Xác thực tài khoản
          </UncontrolledTooltip>

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
      <h3 className="mb-2">Danh sách người dùng</h3>
      <Card>
        <div className="react-dataTable">
          <div className="px-2">
            <TableHeader
              {...{
                ...tableHeaderProps,
                keyword: params?.q,
                onChangeParams,
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
              data={users}
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
