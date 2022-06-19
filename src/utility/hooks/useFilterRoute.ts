export const useFilterRoute = (routes) => {
  return {
    filterRoutes: routes,
    blankLayoutRoutes: routes.filter((el) => el?.meta?.layout === 'blank'),
    guestLayoutRoutes: routes.filter((el) => el?.meta?.layout === 'guest'),
    verticalLayoutRoutes: routes.filter(
      (el) => !el?.meta?.layout || el?.meta?.layout === 'vertical',
    ),
    horizontalLayoutRoutes: routes.filter(
      (el) => el?.meta?.layout === 'horizontal',
    ),
  };
};
