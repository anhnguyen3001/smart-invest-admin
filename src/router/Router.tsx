import PrivateRoute from '@core/components/routes/PrivateRoute';
import PublicRoute from '@core/components/routes/PublicRoute';
import SpinnerComponent from '@core/components/spinner/Fallback-spinner';
import BlankLayout from '@core/layouts/BlankLayout';
import LayoutWrapper from '@core/layouts/components/layout-wrapper';
import { LAYOUT } from 'configs/constants';
import HorizontalLayout from 'layouts/HorizontalLayout';
import VerticalLayout from 'layouts/VerticalLayout';
import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useFilterRoute } from 'utility/hooks';

const Router = ({ routes }) => {
  // ** Hooks
  const { blankLayoutRoutes, verticalLayoutRoutes, horizontalLayoutRoutes } =
    useFilterRoute(routes);

  const renderBlankRoutes = () => {
    return (
      <Route path={blankLayoutRoutes.map((el) => el.path)}>
        <BlankLayout>
          <Suspense fallback={<SpinnerComponent />}>
            <Switch>
              {routes.map(({ component, ...rest }, index) => {
                const RouteTag = rest?.meta?.publicRoute
                  ? PublicRoute
                  : PrivateRoute;
                return (
                  <Route exact key={index} {...rest}>
                    <RouteTag>
                      <Suspense fallback={<SpinnerComponent />}>
                        {component}
                      </Suspense>
                    </RouteTag>
                  </Route>
                );
              })}
            </Switch>
          </Suspense>
        </BlankLayout>
      </Route>
    );
  };

  const renderLayoutRoutes = (layout) => {
    const mapRoutesToLayout = () => {
      switch (layout) {
        case LAYOUT.vertical:
          return [verticalLayoutRoutes, VerticalLayout];
        case LAYOUT.horizontal:
          return [horizontalLayoutRoutes, HorizontalLayout];
      }
    };
    const [routes, Layout] = mapRoutesToLayout();

    const routeComponent = (
      <Suspense fallback={<SpinnerComponent />}>
        <Switch>
          {routes.map(({ component, ...rest }, index) => {
            const RouteTag = rest?.meta?.publicRoute
              ? PublicRoute
              : PrivateRoute;
            return (
              <Route exact key={index} {...rest}>
                <RouteTag>
                  <LayoutWrapper>
                    <Suspense fallback={<SpinnerComponent />}>
                      {component}
                    </Suspense>
                  </LayoutWrapper>
                </RouteTag>
              </Route>
            );
          })}
        </Switch>
      </Suspense>
    );

    if (!Layout) {
      return <Route path={routes.map((el) => el.path)}>{routeComponent}</Route>;
    }

    return (
      <Route path={routes.map((el) => el.path)}>
        <Layout>{routeComponent}</Layout>
      </Route>
    );
  };

  return (
    <Suspense fallback={null}>
      <Switch>
        {renderBlankRoutes()}
        {renderLayoutRoutes(LAYOUT.vertical)}
        {renderLayoutRoutes(LAYOUT.horizontal)}
      </Switch>
    </Suspense>
  );
};

export default Router;
