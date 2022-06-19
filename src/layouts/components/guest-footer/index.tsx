import styled from '@emotion/styled';
import logo from 'assets/images/logo/logo.png';
import classNames from 'classnames';
import { Mail } from 'react-feather';
import { Col, Container, Nav, NavItem, NavLink, Row } from 'reactstrap';
import themeConfig from 'configs/themeConfig';

const menu = [
  {},
  {
    id: 'contact',
    title: 'Thông tin liên hệ',
    items: [
      {
        id: 'email',
        icon: <Mail className="text-primary" size={18} />,
        href: 'mailto:support@tempi.vn',
        content: 'support@tempi.vn',
      },
      // {
      //   id: 'phone',
      //   icon: <PhoneCall className="text-primary" size={18} />,
      //   href: 'tel:1900000',
      //   content: '19000000',
      // },
    ],
  },
  // {
  //   id: 'legal',
  //   title: 'Chính sách',
  //   items: [
  //     {
  //       id: 'term',
  //       href: TERMS,
  //       content: 'Điều khoản',
  //     },
  //     {
  //       id: 'policy',
  //       href: POLICY,
  //       content: 'Chính sách',
  //     },
  //   ],
  // },
];

const GuestFooter = () => {
  return (
    <FooterWrapper>
      <Container className="py-3" fluid="md">
        <Row className="gy-2 gx-3">
          <Col md={6} xs={12}>
            <StyledLogo
              className="d-inline-block mb-1 h-auto"
              src={logo}
              alt="logo"
            />

            <div className="mb-1">
              Nền tảng cung cấp các trang landing mẫu có sẵn để quảng bá thương
              hiệu, giới thiệu sản phẩm, tăng doanh thu... Dễ dàng xây dựng,
              quản lí và chỉnh sửa mà không cần lập trình.
            </div>
            <div className="text-secondary">
              Copyright @ {new Date().getFullYear()} {themeConfig.app.appName},
              Inc, All rights reserved.
            </div>
          </Col>

          {menu.map(({ id, title, items }) => (
            <Col key={id} md={3} xs={12}>
              <h4 className="mb-1">{title}</h4>
              <Nav vertical>
                {items?.map(({ id, content, icon, href }) => (
                  <NavItem key={id}>
                    <StyledNavLink className="px-0" href={href}>
                      {icon}
                      <div
                        className={classNames('d-inline-block', {
                          'ms-1': !!icon,
                        })}
                      >
                        {content}
                      </div>
                    </StyledNavLink>
                  </NavItem>
                ))}
              </Nav>
            </Col>
          ))}
        </Row>
      </Container>
    </FooterWrapper>
  );
};

export default GuestFooter;

const StyledLogo = styled.img`
  width: 125px;
`;

const StyledNavLink = styled(NavLink)`
  color: #000000;
`;

const FooterWrapper = styled.div`
  margin-top: 3rem;
  width: 100%;
  border-top: 1px solid #ddd;
`;
