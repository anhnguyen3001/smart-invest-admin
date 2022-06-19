// ** React Imports
import React, { useState, useEffect } from 'react';

// ** Custom Components
import Avatar from '@core/components/avatar';

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from 'reactstrap';

// ** Services APIs
import { appiApi } from 'services/apis/appi';

// ** Assets
import appSwitcherImage from 'assets/images/default-app-switcher.svg';
import { useUserInfo } from 'utility/hooks';

const AppSwitcherDropdown = () => {
  // ** States
  const [apps, setApps] = useState([]);
  const { canBeCallPrivateApi } = useUserInfo();

  // ** Effects
  useEffect(() => {
    const fetchApps = async () => {
      const res = await appiApi.getAppSwitchers();
      if (res?.data?.switcherItems?.length) {
        setApps(res.data.switcherItems);
      }
    };
    if (canBeCallPrivateApi) fetchApps();
  }, [canBeCallPrivateApi]);

  return (
    <UncontrolledDropdown tag="li" className="nav-item">
      <DropdownToggle
        tag="a"
        className="nav-link me-1"
        href="/"
        onClick={(e) => e.preventDefault()}
      >
        <Avatar img={appSwitcherImage} imgHeight="40" imgWidth="40" />
      </DropdownToggle>
      <DropdownMenu end tag="ul">
        {!!apps.length &&
          apps.map((app) => (
            <DropdownItem
              key={app.id}
              style={{ width: '100%' }}
              onClick={() => window.open(app.appUrl, '_self')}
            >
              <div className="d-flex align-items-start">
                {app.iconUrl ? (
                  <img src={app.iconUrl} alt="" width={36} />
                ) : (
                  <Avatar content="" />
                )}
                <div style={{ marginLeft: 10 }}>
                  <div>{app.name}</div>
                  <div
                    style={{
                      color: '#adadad',
                      maxWidth: 300,
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {app.description}
                  </div>
                </div>
              </div>
            </DropdownItem>
          ))}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default AppSwitcherDropdown;
