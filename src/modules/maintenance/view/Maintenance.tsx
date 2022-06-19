import { Navbar, NavbarBrand } from 'reactstrap';
import logo from 'assets/images/logo/logo.png';
import underMaintain from 'assets/images/pages/under-maintance.png';
import styled from '@emotion/styled';

const Maintenance = () => {
  return (
    <div className="misc-wrapper">
      <Navbar
        color="white"
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
      </Navbar>
      <div className="misc-inner p-2 p-sm-3">
        <div className="w-100 text-center">
          <div className="mt-4">
            <h1 className="mb-1">Website đang nâng cấp và bảo trì 🛠</h1>
            <div className="" style={{ fontSize: 18 }}>
              Mong bạn thông cảm vì sự bất tiện này. Hệ thống Tempi sẽ quay trở
              lại sau ít phút nữa.
            </div>
          </div>

          <StyledImage
            className="img-fluid"
            src={underMaintain}
            alt="Website đang bảo trì"
          />
        </div>
      </div>
    </div>
  );
};
export default Maintenance;

const StyledImage = styled.img`
  margin: auto;
  max-height: 60vh;
  object-fit: contain;
`;
