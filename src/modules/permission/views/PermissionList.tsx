import '@core/scss/react/libs/tables/react-dataTable-component.scss';
import { Table } from '../components/Table';
import { usePermissions } from '../hooks/usePermissions';

const PermissionList = () => {
  const {
    permissions,
    loading,
    setLoading,
    onChangeKeyword,
    params,
    onChangeParams,
    totalPages,
    mutatePermissions,
  } = usePermissions();

  return (
    <Table
      {...{
        permissions,
        loading,
        setLoading,
        onChangeKeyword,
        params,
        onChangeParams,
        totalPages,
        mutatePermissions,
      }}
    />
  );
};

export default PermissionList;
