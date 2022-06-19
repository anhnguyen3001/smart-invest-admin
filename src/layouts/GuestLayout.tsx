import { Helmet } from 'react-helmet';
import GuestNavbar from './components/guest-navbar';
import GuestFooter from './components/guest-footer';
import styled from '@emotion/styled';

const GuestLayout = (props) => {
  const { pageTitle } = props;
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <StyledWrapper className="wrapper">
        <GuestNavbar />
        <div
          className="horizontal-layout horizontal-menu"
          style={{ minHeight: '100%' }}
          {...props}
        />
        <GuestFooter />
      </StyledWrapper>
    </>
  );
};

const StyledWrapper = styled.div`
  &.wrapper {
    .content {
      margin-left: 0;
    }
  }
`;

export default GuestLayout;
