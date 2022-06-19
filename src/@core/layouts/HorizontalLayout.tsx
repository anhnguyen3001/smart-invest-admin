// ** React Imports
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { handleMenuHidden, handleContentWidth } from 'redux/layout';

// ** Third Party Components
import classnames from 'classnames';
import { ArrowUp } from 'react-feather';

// ** Reactstrap Imports
import { Navbar, NavItem, Button } from 'reactstrap';

// ** Configs
import themeConfig from 'configs/themeConfig';

// ** Custom Components

import Customizer from '@core/components/customizer';
import ScrollToTop from '@core/components/scrolltop';
import NavbarComponent from './components/navbar';
import FooterComponent from './components/footer';
import MenuComponent from './components/menu/horizontal-menu';

// ** Custom Hooks
import {
  useRTL,
  useSkin,
  useLayout,
  useNavbarColor,
  useNavbarType,
  useFooterType,
  useRouterTransition,
} from 'utility/hooks';

// ** Styles
import '@core/scss/base/core/menu/menu-types/horizontal-menu.scss';
import { useAppDispatch, useAppSelector } from 'redux/store';

const HorizontalLayout = (props) => {
  // ** Props
  const { navbar, menuData, footer, children, menu } = props;

  // ** Hooks
  const { skin, setSkin } = useSkin();
  const [isRtl, setIsRtl] = useRTL();
  const { navbarType, setNavbarType } = useNavbarType();
  const { footerType, setFooterType } = useFooterType();
  const { navbarColor, setNavbarColor } = useNavbarColor();
  const { layout, setLayout, setLastLayout } = useLayout();
  const { transition, setTransition } = useRouterTransition();

  // ** States
  const [isMounted, setIsMounted] = useState(false);
  const [navbarScrolled, setNavbarScrolled] = useState(false);

  // ** Store Vars
  const dispatch = useAppDispatch();
  const layoutStore = useAppSelector((state) => state.layout);

  // ** Vars
  const contentWidth = layoutStore.contentWidth;
  const isHidden = layoutStore.menuHidden;

  // ** Handles Content Width
  const setContentWidth = (val) => dispatch(handleContentWidth(val));

  // ** Handles Content Width
  const setIsHidden = (val) => dispatch(handleMenuHidden(val));

  // ** UseEffect Cleanup
  const cleanup = () => {
    setIsMounted(false);
    setNavbarScrolled(false);
  };

  //** ComponentDidMount
  useEffect(() => {
    setIsMounted(true);
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 65 && navbarScrolled === false) {
        setNavbarScrolled(true);
      }
      if (window.pageYOffset < 65) {
        setNavbarScrolled(false);
      }
    });
    return () => cleanup();
    // eslint-disable-next-line
  }, []);

  // ** Vars
  const footerClasses = {
    static: 'footer-static',
    sticky: 'footer-fixed',
    hidden: 'footer-hidden',
  };

  const navbarWrapperClasses = {
    floating: 'navbar-floating',
    sticky: 'navbar-sticky',
    static: 'navbar-static',
  };

  const navbarClasses = {
    floating:
      contentWidth === 'boxed' ? 'floating-nav container-xxl' : 'floating-nav',
    sticky: 'fixed-top',
  };

  const bgColorCondition =
    navbarColor !== '' && navbarColor !== 'light' && navbarColor !== 'white';

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={classnames(
        `wrapper horizontal-layout horizontal-menu ${
          navbarWrapperClasses[navbarType] || 'navbar-floating'
        } ${footerClasses[footerType] || 'footer-static'} menu-expanded`,
      )}
      {...(isHidden ? { 'data-col': '1-column' } : {})}
    >
      <Navbar
        expand="lg"
        container={false}
        className={classnames(
          'header-navbar navbar-fixed align-items-center navbar-shadow navbar-brand-center',
          {
            'navbar-scrolled': navbarScrolled,
          },
        )}
      >
        {!navbar && (
          <div className="navbar-header d-xl-block d-none">
            <ul className="nav navbar-nav">
              <NavItem>
                <Link to="/" className="navbar-brand">
                  <span className="brand-logo">
                    <img src={themeConfig.app.appLogoImage} alt="logo" />
                  </span>
                  <h2 className="brand-text mb-0">{themeConfig.app.appName}</h2>
                </Link>
              </NavItem>
            </ul>
          </div>
        )}

        <div className="navbar-container d-flex content">
          {navbar ? (
            navbar({ skin, setSkin })
          ) : (
            <NavbarComponent skin={skin} setSkin={setSkin} />
          )}
        </div>
      </Navbar>
      {!isHidden ? (
        <div className="horizontal-menu-wrapper">
          <Navbar
            tag="div"
            expand="sm"
            light={skin !== 'dark'}
            dark={skin === 'dark' || bgColorCondition}
            className={classnames(
              `header-navbar navbar-horizontal navbar-shadow menu-border`,
              {
                [navbarClasses[navbarType]]: navbarType !== 'static',
                'floating-nav':
                  (!navbarClasses[navbarType] && navbarType !== 'static') ||
                  navbarType === 'floating',
              },
            )}
          >
            {menu ? menu({ menuData }) : <MenuComponent menuData={menuData} />}
          </Navbar>
        </div>
      ) : null}

      {children}
      {themeConfig.layout.customizer === true ? (
        <Customizer
          skin={skin}
          isRtl={isRtl}
          layout={layout}
          setSkin={setSkin}
          setIsRtl={setIsRtl}
          isHidden={isHidden}
          setLayout={setLayout}
          footerType={footerType}
          navbarType={navbarType}
          transition={transition}
          setIsHidden={setIsHidden}
          themeConfig={themeConfig}
          navbarColor={navbarColor}
          contentWidth={contentWidth}
          setTransition={setTransition}
          setFooterType={setFooterType}
          setNavbarType={setNavbarType}
          setLastLayout={setLastLayout}
          setNavbarColor={setNavbarColor}
          setContentWidth={setContentWidth}
        />
      ) : null}
      <footer
        className={classnames(
          `footer footer-light ${footerClasses[footerType] || 'footer-static'}`,
          {
            'd-none': footerType === 'hidden',
          },
        )}
      >
        {footer ? footer : <FooterComponent />}
      </footer>

      {themeConfig.layout.scrollTop === true ? (
        <div className="scroll-to-top">
          <ScrollToTop
            showOffset={300}
            className="scroll-top d-block scroll-top-wrapper"
          >
            <Button className="btn-icon" color="primary">
              <ArrowUp size={16} />
            </Button>
          </ScrollToTop>
        </div>
      ) : null}
    </div>
  );
};
export default HorizontalLayout;
