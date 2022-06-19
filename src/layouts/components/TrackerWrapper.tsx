import { useAutoPageView } from 'react-tracker-teko';
import { PAGE_TITLE_MAPPING } from 'router/path';

const TrackerWrapper = (props) => {
  const { children, screenName, contentType, path } = props;
  useAutoPageView({
    screenName,
    contentType,
    pageTitle: PAGE_TITLE_MAPPING[path],
  } as any);
  return children;
};

export default TrackerWrapper;
