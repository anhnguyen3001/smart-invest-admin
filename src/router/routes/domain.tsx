// ** React Imports
import { lazy } from 'react';
import { DOMAINS } from '../path';
import { TRACKING_SCREEN_MAPPING } from 'router/path';
const DomainList = lazy(() => import('../../modules/domain/views/DomainList'));

const DomainRoutes = [
  {
    path: DOMAINS,
    component: <DomainList />,
    screenName: TRACKING_SCREEN_MAPPING[DOMAINS],
    contentType: 'others',
    meta: {
      publicRoute: false,
      requiredOwnerMerchant: true,
    },
  },
];

export default DomainRoutes;
