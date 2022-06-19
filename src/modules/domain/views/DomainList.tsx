import '@core/scss/react/libs/tables/react-dataTable-component.scss';
import { useState } from 'react';
import DomainGuideLine from '../components/DomainGuideLine';
import DomainModal from '../components/DomainModal';
import QuickGuideModal from '../components/QuickGuideModal';
import Table from '../components/Table';
import { useDomains } from '../hooks/useDomains';

const DomainList = () => {
  const {
    domains,
    loading,
    params,
    onChangeParams,
    totalItems,
    totalPages,
    mutateDomains,
  } = useDomains();
  const [visibleCreateDomain, setVisibleCreateDomain] = useState(false);
  const [showQuickGuide, setShowQuickGuide] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [domain, setDomain] = useState('');

  const handleToggleShowGuide = () => {
    setShowGuide(!showGuide);
  };

  return (
    <>
      <Table
        {...{
          domains,
          totalItems,
          totalPages,
          onShowGuide: handleToggleShowGuide,
          params,
          onChangeParams,
          loading,
          onCreateDomain: () => setVisibleCreateDomain(true),
          mutateDomains,
        }}
      />
      <DomainModal
        mutateDomains={mutateDomains}
        visible={visibleCreateDomain}
        setVisible={setVisibleCreateDomain}
        title="Thêm tên miền mới"
        setDomain={setDomain}
        setShowQuickGuide={setShowQuickGuide}
      />
      <DomainGuideLine
        showGuide={showGuide}
        handleToggleShowGuide={handleToggleShowGuide}
      />
      <QuickGuideModal
        visible={showQuickGuide}
        setVisible={setShowQuickGuide}
        domain={domain}
      />
    </>
  );
};

export default DomainList;
