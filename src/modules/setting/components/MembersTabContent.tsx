import UILoader from '@core/components/ui-loader';
import DataTable from 'react-data-table-component';
import {
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  Button,
  Row,
  Col,
  Input,
} from 'reactstrap';
import { useMembers } from '../hooks/useMembers';
import ReactPaginate from 'react-paginate';
import { Plus, Trash } from 'react-feather';
import { useState } from 'react';
import AddMemberPopup from './AddMemberPopup';
import merchantApi from 'modules/merchant/utils/api';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useAppSelector } from 'redux/store';

const MembersTabContent = () => {
  const authState = useAppSelector((state) => state.auth);
  const currentUser = authState?.user;
  const [visibleAddMember, setVisibleAddMember] = useState(false);
  const {
    members,
    loading,
    keyword,
    onChangeKeyword,
    params,
    onChangeParams,
    totalPages,
    mutateMembers,
  } = useMembers();

  const MySwal = withReactContent(Swal);

  const handlePagination = (page) => {
    onChangeParams((prev) => ({
      ...prev,
      page: page.selected + 1,
    }));
  };

  const deleteMember = async (id) => {
    await merchantApi.deleteUser(id);
    mutateMembers();
  };

  const handleDeleteMember = (member) => {
    return MySwal.fire({
      title: `Xóa bản ghi ${member.name}?`,
      text: 'Dữ liệu sẽ không thể khôi phục sau khi xóa!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý xóa',
      cancelButtonText: 'Hủy',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1',
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMember(member.iamId).then(() =>
          MySwal.fire({
            icon: 'success',
            title: 'Xóa thành công!',
            text: 'Bản ghi đã được xóa thành công.',
            confirmButtonText: 'Đóng',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
          }),
        );
      }
    });
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
      name: 'Tên',
      key: 'name',
      minWidth: '300px',
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <div className="d-flex flex-column">
            <div className="user_name text-truncate text-body">
              <span className="fw-bolder">{row.name || row.phoneNumber}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: 'Số điện thoại',
      center: true,
      cell: (row) => (
        <div className="d-flex justify-content-center align-items-center">
          <span className="fw-bolder">{row.phoneNumber}</span>
        </div>
      ),
    },
    {
      name: 'Thao tác',
      center: true,
      cell: (row) => {
        if (row.iamId === currentUser?.sub) return null;
        return (
          <div className="d-flex justify-content-center align-items-center">
            <Button
              size="sm"
              color="transparent"
              className="btn btn-icon"
              onClick={() => handleDeleteMember(row)}
            >
              <Trash className="font-medium-2" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">Danh sách quản trị viên</CardTitle>
        </CardHeader>
        <CardBody className="p-0 m-0">
          <div className="react-dataTable">
            <div className="m-1 ms-2">
              <Row>
                <Col sm="8" className="d-flex align-items-center p-0">
                  <div
                    style={{ flex: 1 }}
                    className="d-flex align-items-center mb-sm-0 mb-1"
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
                  sm="4"
                  className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pe-lg-1 p-0 mt-lg-0"
                >
                  <Button
                    size="sm"
                    className="d-flex align-items-center ms-1"
                    color="primary"
                    onClick={() => setVisibleAddMember(true)}
                  >
                    <Plus className="me-50" />
                    Thêm quản trị viên
                  </Button>
                </Col>
              </Row>
            </div>
            <UILoader blocking={loading}>
              <DataTable
                noHeader
                pagination
                responsive
                paginationServer
                columns={columns}
                data={members}
                className="react-dataTable"
                paginationComponent={CustomPagination}
              />
            </UILoader>
          </div>
        </CardBody>
      </Card>
      <AddMemberPopup
        visible={visibleAddMember}
        setVisible={setVisibleAddMember}
        onSuccess={() => {
          setVisibleAddMember(false);
          mutateMembers();
        }}
      />
    </>
  );
};

export default MembersTabContent;
