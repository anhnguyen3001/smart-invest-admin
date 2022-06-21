import '@core/scss/react/libs/tables/react-dataTable-component.scss';
import { Table } from '../components/Table';
import { useUsers } from '../hooks/useUsers';

const UserList = () => {
  const {
    users,
    loading,
    setLoading,
    onChangeKeyword,
    params,
    onChangeParams,
    totalPages,
    mutateUsers,
  } = useUsers();

  return (
    <Table
      {...{
        users,
        loading,
        setLoading,
        onChangeKeyword,
        params,
        onChangeParams,
        totalPages,
        mutateUsers,
      }}
    />
  );
};

export default UserList;
