// ** Custom Components
import Avatar from '@core/components/avatar';

// ** Third Party Components
import { User, Power } from 'react-feather';

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from 'reactstrap';

// ** Default Avatar Image
import { logout } from 'utility/Utils';
import { useAppSelector } from 'redux/store';

const UserDropdown = () => {
  // ** Store Vars
  const authStore = useAppSelector((state) => state.auth);
  const { picture } = authStore?.user || {};

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link me-1"
        onClick={(e) => e.preventDefault()}
      >
        <Avatar
          {...(picture ? { img: picture } : { icon: <User /> })}
          imgHeight="40"
          imgWidth="40"
          status="online"
        />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem style={{ width: '100%' }} onClick={() => logout()}>
          <Power size={14} className="me-75" />
          <span className="align-middle">Đăng xuất</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
