import { LAYOUT } from 'configs/constants';

export const useFilterRoute = (routes) => {
  return {
    filterRoutes: routes,
    blankLayoutRoutes: routes.filter((el) => el?.meta?.layout === LAYOUT.blank),
    verticalLayoutRoutes: routes.filter(
      (el) => !el?.meta?.layout || el?.meta?.layout === LAYOUT.vertical,
    ),
  };
};
