import PrivateRoute from '@core/components/routes/PrivateRoute';
import PublicRoute from '@core/components/routes/PublicRoute';
import SpinnerComponent from '@core/components/spinner/Fallback-spinner';
import BlankLayout from '@core/layouts/BlankLayout';
import LayoutWrapper from '@core/layouts/components/layout-wrapper';
import VerticalLayout from 'layouts/VerticalLayout';
import { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useFilterRoute } from 'utility/hooks';
import { USER_LIST } from './path';

const Router = ({ routes }) => {
  // ** Hooks
  const { blankLayoutRoutes, verticalLayoutRoutes } = useFilterRoute(routes);

  const renderBlankRoutes = () => {
    return (
      <Route path={blankLayoutRoutes.map((el) => el.path)}>
        <BlankLayout>
          <Suspense fallback={<SpinnerComponent />}>
            <Switch>
              {routes.map((route, index) => {
                const { component, ...rest } = route;
                const RouteTag = rest?.meta?.publicRoute
                  ? PublicRoute
                  : PrivateRoute;
                return (
                  <Route exact key={index} {...rest}>
                    <RouteTag route={route}>
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

  const renderLayoutRoutes = () => {
    const routeComponent = (
      <Suspense fallback={<SpinnerComponent />}>
        <Switch>
          {verticalLayoutRoutes.map((route, index) => {
            const { component, ...rest } = route;

            const RouteTag = rest?.meta?.publicRoute
              ? PublicRoute
              : PrivateRoute;
            return (
              <Route exact key={index} {...rest}>
                <RouteTag route={route}>
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

    return (
      <Route path={routes.map((el) => el.path)}>
        <VerticalLayout>{routeComponent}</VerticalLayout>
      </Route>
    );
  };

  return (
    <Suspense fallback={null}>
      <Switch>
        {renderBlankRoutes()}
        {renderLayoutRoutes()}
        <Redirect to={USER_LIST} />
      </Switch>
    </Suspense>
  );
};

export default Router;
