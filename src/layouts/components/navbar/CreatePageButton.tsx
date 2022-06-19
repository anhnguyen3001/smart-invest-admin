import { ADMIN } from 'router/path';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import { Plus } from 'react-feather';
import PageModal from '../../../modules/page/components/PageModal';
import { useInitMerchant } from 'modules/merchant/hooks/useInitMerchant';
import { useTracking } from 'utility/hooks/useTracking';

const CreatePageButton = () => {
  const { getAttrTracking } = useTracking();
  const history = useHistory();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [visibleCreatePage, setVisibleCreatePage] = useState(false);
  const { currentMerchant } = useInitMerchant();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const useTemplate = () => {
    if (window.location.pathname !== '/admin') {
      history.push(ADMIN);
    } else {
      document
        .getElementById('scroll-flag')
        .scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <UncontrolledDropdown
        tag="li"
        className="nav-item"
        isOpen={dropdownOpen}
        toggle={toggleDropdown}
      >
        <div>
          <DropdownToggle color="primary" disabled={!currentMerchant}>
            <Plus size={17} className="me-50" />
            <span className="align-middle">Thêm trang mới</span>
          </DropdownToggle>
        </div>
        <DropdownMenu end>
          <DropdownItem
            {...getAttrTracking({
              regionName: 'addPageBtnGroup',
              contentName: 'addPageFromTemplateBtn',
              target: 'popupAddPage',
            })}
            className="full-width"
            onClick={useTemplate}
          >
            Sử dụng giao diện mẫu
          </DropdownItem>
          <DropdownItem
            className="full-width"
            onClick={() => setVisibleCreatePage(true)}
            {...getAttrTracking({
              regionName: 'addPageBtnGroup',
              contentName: 'addPageBlankBtn',
              target: 'popupAddPage',
            })}
          >
            Sử dụng trang trắng
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      <PageModal
        visible={visibleCreatePage}
        setVisible={setVisibleCreatePage}
        title="Thêm trang mới"
        hideChooseDesignMode
      />
    </>
  );
};

export default CreatePageButton;
