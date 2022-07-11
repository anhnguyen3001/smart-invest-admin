import Avatar from '@core/components/avatar';
import { useAuth } from 'modules/core';
import { Power, User } from 'react-feather';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';

const NavbarUser = () => {
  const { user, logout } = useAuth();
  const { avatar } = user || {};

  return (
    <ul className="nav navbar-nav align-items-center ms-auto">
      <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
        <DropdownToggle
          href="/"
          tag="a"
          className="nav-link dropdown-user-link me-1"
          onClick={(e) => e.preventDefault()}
        >
          <Avatar
            {...(avatar ? { img: avatar } : { icon: <User /> })}
            imgHeight="40"
            imgWidth="40"
          />
        </DropdownToggle>
        <DropdownMenu end>
          <DropdownItem style={{ width: '100%' }} onClick={logout}>
            <Power size={14} className="me-75" />
            <span className="align-middle">Đăng xuất</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </ul>
  );
};
export default NavbarUser;
