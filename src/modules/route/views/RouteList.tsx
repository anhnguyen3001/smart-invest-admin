import '@core/scss/react/libs/tables/react-dataTable-component.scss';
import { Table } from '../components/Table';
import { useRoutes } from '../hooks/useRoutes';

const RouteList = () => {
  const {
    routes,
    loading,
    setLoading,
    onChangeKeyword,
    params,
    onChangeParams,
    totalPages,
    mutateRoutes,
  } = useRoutes();

  return (
    <Table
      {...{
        routes,
        loading,
        setLoading,
        onChangeKeyword,
        params,
        onChangeParams,
        totalPages,
        mutateRoutes,
      }}
    />
  );
};

export default RouteList;
