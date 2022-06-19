// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from 'reactstrap';

import { useInitMerchant } from 'modules/merchant/hooks/useInitMerchant';
import { setCurrentMerchant } from 'utility/Utils';

const MerchantDropdown = () => {
  const { currentMerchant, activeMerchants } = useInitMerchant();

  const handleClickMerchantItem = async (merchant) => {
    if (currentMerchant?.id === merchant.id) return;
    setCurrentMerchant(merchant.id);
    window.location.reload();
  };

  if (!currentMerchant) return null;

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">{currentMerchant?.label}</span>
        </div>
      </DropdownToggle>
      {activeMerchants?.length > 1 && (
        <DropdownMenu end>
          {activeMerchants.map((el) => (
            <DropdownItem
              key={el.id}
              style={{ width: '100%' }}
              onClick={() => handleClickMerchantItem(el)}
            >
              <span className="align-middle ms-50">{el.label}</span>
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </UncontrolledDropdown>
  );
};

export default MerchantDropdown;
