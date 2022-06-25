import '@core/scss/react/libs/tables/react-dataTable-component.scss';
import { Table } from '../components/Table';
import { useRoles } from '../hooks/useRoles';

const RoleList = () => {
  const {
    roles,
    loading,
    setLoading,
    onChangeKeyword,
    params,
    onChangeParams,
    totalPages,
    mutateRoles,
  } = useRoles();

  return (
    <Table
      {...{
        roles,
        loading,
        setLoading,
        onChangeKeyword,
        params,
        onChangeParams,
        totalPages,
        mutateRoles,
      }}
    />
  );
};

export default RoleList;
