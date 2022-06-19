import { useRouteMatch } from 'react-router-dom';
import { PAGE_TITLE_MAPPING, TRACKING_SCREEN_MAPPING } from 'router/path';

export const useScreen = () => {
  const { path } = useRouteMatch();
  return {
    trackingScreenName: TRACKING_SCREEN_MAPPING[path],
    pageTitle: PAGE_TITLE_MAPPING[path],
  };
};
