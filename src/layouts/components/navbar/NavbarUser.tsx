import Avatar from '@core/components/avatar';
import { useUser } from 'modules/user/hooks';
import { Power, User } from 'react-feather';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import { useAppSelector } from 'redux/store';

const NavbarUser = () => {
  const { avatar, username } = useAppSelector((state) => state.auth.user) || {};
  const { logout } = useUser();

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
          <div className="ms-1">{username}</div>
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
