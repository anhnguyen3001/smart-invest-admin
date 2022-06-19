// ** Reactstrap Imports
import { Nav, NavItem, NavLink } from 'reactstrap';

// ** Icons Imports
import { Users, ShoppingBag } from 'react-feather';
import { useTracking } from 'utility/hooks/useTracking';

const Tabs = ({ activeTab, toggleTab }) => {
  const { getAttrTracking } = useTracking();
  return (
    <Nav pills className="mb-2">
      <NavItem>
        <NavLink
          {...getAttrTracking({
            regionName: 'storeInfo',
            contentName: 'storeInfoBtn',
            target: 'pageStoreInfo',
          })}
          active={activeTab === '1'}
          onClick={() => toggleTab('1')}
        >
          <ShoppingBag size={18} className="me-50" />
          <span className="fw-bold">Thông tin cửa hàng</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          {...getAttrTracking({
            regionName: 'adminInfo',
            contentName: 'adminInforBtn',
            target: 'pageStoreInfo',
          })}
          active={activeTab === '2'}
          onClick={() => toggleTab('2')}
        >
          <Users size={18} className="me-50" />
          <span className="fw-bold">Quản trị viên</span>
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default Tabs;
