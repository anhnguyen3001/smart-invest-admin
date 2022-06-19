import Table from '../components/Table';
import { usePages } from '../hooks/usePages';
import '@core/scss/react/libs/tables/react-dataTable-component.scss';

const PageList = () => {
  const {
    pages,
    totalItems,
    totalPages,
    keyword,
    onChangeKeyword,
    params,
    onChangeParams,
    loading,
    mutatePages,
  } = usePages();

  return (
    <>
      <Table
        {...{
          pages,
          totalItems,
          totalPages,
          keyword,
          onChangeKeyword,
          params,
          onChangeParams,
          loading,
          mutatePages,
        }}
      />
    </>
  );
};

export default PageList;
