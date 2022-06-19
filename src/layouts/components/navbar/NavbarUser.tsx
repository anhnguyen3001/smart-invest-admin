import { login } from 'utility/Utils';
import { Button } from 'reactstrap';
import UserDropdown from './UserDropdown';
import MerchantDropdown from 'modules/merchant/components/MerchantDropdown';
import CreatePageButton from './CreatePageButton';
import { useAppSelector } from 'redux/store';
import AppSwitcherDropdown from './AppSwitcherDropdown';

const NavbarUser = () => {
  const user = useAppSelector((state) => state.auth.user);
  const initingIam = useAppSelector((state) => state.auth.initingIam);

  return (
    <ul className="nav navbar-nav align-items-center ms-auto">
      {user ? (
        <div className="d-flex align-items-center">
          <MerchantDropdown />
          <UserDropdown />
          {window?.config?.turnOnAppSwitcher && <AppSwitcherDropdown />}
          <CreatePageButton />
        </div>
      ) : (
        <Button
          disabled={initingIam}
          className="round"
          color="primary"
          onClick={login}
        >
          Đăng nhập
        </Button>
      )}
    </ul>
  );
};
export default NavbarUser;
