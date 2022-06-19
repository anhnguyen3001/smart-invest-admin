import { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Button,
  Spinner,
} from 'reactstrap';
import logo from 'assets/images/logo/logo.png';
import { User, Power, List } from 'react-feather';
import Avatar from '@core/components/avatar';
import { Link } from 'react-router-dom';
import { ADMIN } from 'router/path';
import { login, logout } from 'utility/Utils';
import { useAppSelector } from 'redux/store';
import { useTracking } from 'utility/hooks/useTracking';

const GuestNavbar = () => {
  const { getAttrTracking } = useTracking();
  const authStore = useAppSelector((state) => state.auth);
  const user = authStore?.user;
  const initingIam = authStore?.initingIam;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Navbar
        color="white"
        fixed="top"
        expand="md"
        container="md"
        style={{
          paddingTop: 20,
          paddingBottom: 20,
          boxShadow:
            '0px 4px 16px rgba(0, 0, 0, 0.05), 0px 8px 16px rgba(0, 0, 0, 0.05)',
        }}
      >
        <NavbarBrand href="/">
          <img alt="" style={{ maxWidth: 96, height: 'auto' }} src={logo} />
        </NavbarBrand>
        <NavbarToggler color="#000000" onClick={() => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          {!!user ? (
            <UncontrolledDropdown
              tag="li"
              className="d-flex align-items-center dropdown-user nav-item ms-auto"
            >
              <DropdownToggle
                href="/"
                tag="a"
                className="nav-link dropdown-user-link"
                onClick={(e) => e.preventDefault()}
              >
                <Avatar
                  {...(user?.picture
                    ? { img: user.picture }
                    : { content: <User /> })}
                  imgHeight="40"
                  imgWidth="40"
                  status="online"
                />
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem tag={Link} style={{ width: '100%' }} to={ADMIN}>
                  <List size={14} className="me-75" />
                  <span className="align-middle">Bảng điều khiển</span>
                </DropdownItem>
                <DropdownItem
                  style={{ width: '100%' }}
                  onClick={() => logout()}
                >
                  <Power size={14} className="me-75" />
                  <span className="align-middle">Đăng xuất</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          ) : (
            <Button
              {...getAttrTracking({
                regionName: 'signinSignoutBtn',
                contentName: 'signinSignoutBtn',
                target: 'signIn',
              })}
              disabled={initingIam}
              className="fw-bolder ms-auto"
              color="primary"
              outline
              style={{ cursor: 'pointer' }}
              onClick={login}
            >
              {initingIam && <Spinner size="sm" className="me-1" />}
              Đăng ký/Đăng nhập
            </Button>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default GuestNavbar;
